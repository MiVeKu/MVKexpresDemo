const uploadStorage = require('../middleware/upload');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();


/*
 router for handling html traffic. application has CRD functionality,
 with update omitted due to constraints induced by GridFsBucket.

 after database connection and upload middleware routes icluded for post,
 get all, get one and delete.
*/

let gfs;
    // initialising a variable for MongoDB commands later in application.
const conn = mongoose.createConnection(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'upload',
    // assigning collection parameters specified in upload.js to gfs.
    });
    console.log('Connection to DB open.');
});
    // database connection for upload and streaming actions.

function uploadMW(req, res, next) {
    // upload middleware for calling multer instance in upload.js.
    const upload = uploadStorage.single('image');
    // initialising variable as multer insance specified in uploadf.js with the correct parameter.
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.status(400).send('File too large');
        } else if (err) {
            if (err === 'filetype') return res.status(400).send('Image files only');
            return res.sendStatus(500);
        }
        // if file type and size are within given specifications data is passed to multer instance for correct saving to database.
        console.log('Uploading');
        next();
    });
};

router.post('/upload/', uploadMW, async (req, res) => {
    // post route for passing form data in correct format for upload middleware.
    const { file } = req;
    const { id } = file;
    if (file.size > 8000000) {
        // file is deleted if size exceeds specified byte size.
        deleteImage(id);
        // calling delete middleware.
        return res.status(400).send('File may not exceed 8 mb.');
    }
    console.log('uploaded file: ', file.filename);
    return res.redirect('/');
    // refress main view by redirecting to index.
});

const deleteImage = id => {
    // delete middleware for repeated use within codeFile
    if (!id || id === 'undefined') return res.status(400).send('no image id.');
    // checking is file id exists.
    const _id = new mongoose.Types.ObjectId(id);
    // initialising a Mongoose object id for using MongoDB commands.
    gfs.delete(_id, err => {
        // sending command to delete files with the specified id and checking for erros.
        if (err) return res.status(500).send('image deletion error.');
    })
}

router.get('/', ({ params: { } }, res) => {
    //get route for all files in database. also used for passing data to front.
    gfs.find().toArray((err, files) => {
        // insert gfs.find() to array to produce JSON object out of object key value pairs from database.
        var keyCount = Object.keys(files).length;
        // getting the number of keys inside the JSON object.
        if (typeof files === undefined || keyCount === 0) {
            // testing if files is an object or if it has no keys inside. If either returns true pug files template is set to display a message.
            return res.render('index', {
                mark: 'no images'
            });
        } else if (err) {
            // catching other errors to console and preventing crashing.
            console.log(err);
        }
        else {
            console.log("user in index.");
            console.log(files);
            // loggin files to console for information and rendering index for user with data in file object.
            // as pug is set as a native viewengine for the app, files can be passed on as a JSON object.
            return res.render('index', {
                mark: 'images gotten', title: 'Images', files: files
            });
        }
    });
});

router.get('/stream/:id', ({ params: { id } }, res) => {
    //get route for specific files in database. used to stream images to front.
    if (!id || id === 'undefined') return res.status(400).send('No image id.');
    // checking if id exists
    const _id = new mongoose.Types.ObjectId(id);
    // initialising a Mongoose object id for using MongoDB commands.
    gfs.find({ _id }).toArray((err, files) => {
        // as above in get all route, forming the JSON object and testing type and lenght to prevent errors.
        var keyCount = Object.keys(files).length;
        console.log(keyCount);
        if (typeof files === undefined || keyCount === 0)
            return res.status(400).send('no files exist.');
        // if JSON object exists and is properly formed its id is used to stream file to front.
        gfs.openDownloadStream(_id).pipe(res);
        console.log("Streaming image " + _id + " to user.");
    });
});

router.get('/delete/:id', ({ params: { id } }, res) => {
    //get route for deleting specific files in database. checks if id exists, initialises Mongoose object and calls deleteImage middleware. redirects to index to refres template.
    if (!id || id === 'undefined') return res.status(400).send('No image id.');
    const _id = new mongoose.Types.ObjectId(id);
    console.log('Trying to deleting image ' + id + '.');
    deleteImage(id);
    console.log('Image' + _id + 'deleted');
    return res.redirect('/');
});

module.exports = router;