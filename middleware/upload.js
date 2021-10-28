const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
//var Grid = require('gridfs-stream');
const crypto = reguire('crypto');

const storage = new GridFsStorage({
    // initialising new GridFsStorage instance to create a model for saving information to MongoDb.
    url: process.env.DB,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                // randomised name from crypto to prevent user mishaps with naming.
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                // forming the new name for the uploaded file and allocating bucket name.
                const fileInfo = {
                    filename: filename,
                    bucketName: 'upload'
                };
                resolve(fileInfo);
            });
        });
    }
});

const uploadStorage = multer({
    // calling multer to save information to MongoDb with the model specified in storage and parameters from checkFiletype.
    storage,
    limits: {fileSize: 40000000},
    fileFilter: function(req, file, cb) {
        checkFiletype(file, cb)
    }
});

function checkFiletype(file, cb) {
    // helper function for inbuilt multer file filtering functionality.
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname) return cb(null, true);
    cb('filetype');
}

module.exports = uploadStorage;