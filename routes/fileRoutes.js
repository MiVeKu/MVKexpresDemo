const uploadStorage = require('../middleware/upload');
const express = require('express');
const connection = require('./db');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const router = express.Router();


/*TODO add routes starting with post, get, delete
use your own + from youtube https://www.youtube.com/watch?v=XCRUzPi0X0Q and https://www.youtube.com/watch?v=OvbRLY1QRIk
*/
const conn = connection();

let gfs;

conn.once('open', ()=>{
    gfs = new mongoose.mongo.GridFSBucket(conn.db), {
        bucketName: 'images'
    }
});

function uploadMW(req, res, next) {
    const upload = uploadStorage.single('image');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('File too large');
        } else if (err) {
            if (err === 'filetype') return res.status(400).send('Image files only');
            return res.sendStatus(500);
        }
        next();
    });
};

router.post('/upload/', uploadMW, async(req, res)=> {
    const {file} = req;
    const {id} = file;
    if(file.size > 8000000) {
        deleteImage(id);
        return res.status(400).send('File may not exceed 8 mb');
    }
    console.log('uploaded file: ', file);
    return res.send(file.id);
});

const deleteImage = id => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.objectiveId(id);
    gfs.delete(_id, err => {
        if (err) return res.status(500).send('image deletion error');
    })
}

router.get('/:id', ({params: {id}}, res )=>{
    if (!id || id === 'undefined') return res.status(400).send('No image id');
    const _id = new.mongoose.Types.ObjectId(id);
    gfs.find({_id}).toArray((err, files)=> {
        if (!files || files.lenght === 0)
         return res.status(400).send('no files exist');
        gfs.openDownloadStream(_id).pipe(res);
    });
});

module.exports = router;