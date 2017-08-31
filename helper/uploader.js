const Storage = require('@google-cloud/storage')
require('dotenv').config()

const storage = Storage({
  projectId: 'valued-fortress-175314',
  keyFilename: 'keystorage.json'
})

const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const bucket = storage.bucket(CLOUD_BUCKET)
const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

// here
const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }
  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic()
    .then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })
  stream.end(req.file.buffer)
}
//====== here 2
const Multer = require('multer');

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024  // 5Mb size limit
    }
  })
// here 3

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}
