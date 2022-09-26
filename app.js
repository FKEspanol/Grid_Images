const express = require('express');
const cors = require('cors');
const path = require("path");
const fs = require('fs');
const PORT = 9000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/images', (req, res) => {
    const imgsPath = req.header("path");
    fs.readdir(path.join(__dirname, imgsPath), (err, files) => {
        if(err) {
            console.error(err);
            return res.status(404).json({ error: err});
        } else {
            files = files.map((fileName) => {
                return {
                    name: fileName,
                    time: fs.statSync(`./${imgsPath}` + '/' + fileName).mtime.getTime()
                };
            }).sort((a,b) => b.time - a.time).map(v => v.name);

            res.status(200).send(files);
        }
    })
})


app.listen(PORT, () => console.log(`Server Port is at ${PORT}`));