var fs = require('fs');
require('dotenv').config()
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

var CLOUD_BUCKET = process.env.CLOUDBUCKET

var gcs = require('@google-cloud/storage')({
  projectId: 'my-project-1473554995184',
  keyFilename: './keyfile.json'
});

var bucket = gcs.bucket('rapid-share-clone');

function sendUploadToGCS (req, res, next) {
  if (!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  console.log("====>",gcsname);
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic()
    .then(()=>{
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    })
  });

  stream.end(req.file.buffer);
}

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}


module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
};
