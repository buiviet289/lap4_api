const express = require('express')

const app = express();

const port = 3000;


app.listen(port, () => {
    console.log('server dang chay cong: ' + port);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
    // res.send('trang chu');
})

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        var dir = './uploads';

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive:true});
        }
        cb(null, 'uploads')
    },
    filename: function (req, file, cb){
        let fileName = file.originalname;
        let newFileName = fileName;
        cb(null, newFileName)
    }
})

const fs = require('fs');
const upload = multer({storage: storage});

app.post('/uploadfile', upload.single('myfile'), (req, res, next) => {
    let file = req.file;
    if(!file){
        const error = new Error('can chon file');
        error.httpStatusCode = 400;
        return next (error);
    }
    res.send(file);
})




