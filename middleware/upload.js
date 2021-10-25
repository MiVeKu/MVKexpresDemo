const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
//var Grid = require('gridfs-stream');
const crypto = reguire('crypto');

const storage = new GridFsStorage({
    url: process.env.DB,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                // randomised name from crypto to prevent user mishaps with naming
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'upload'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 40000000},
    fileFilter: function(req, file, cb) {
        checkFiletype(file, cb)
    }
});

function checkFiletype(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname) return cb(null, true);
    cb('filetype');
}

module.exports = upload;