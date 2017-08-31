var express = require('express')
var router = express.Router()
var uploader = require('../helper/uploader')

router.get('/', (req, res) => {
  res.send('testing awal')
})

router.post('/',
  uploader.multer.single('image'),
  uploader.sendUploadToGCS,
  (req, res) => {
    res.send({
      filename: req.file.originalname,
      link: req.file.cloudStoragePublicUrl,
      msg: 'file uploaded'
    })
  })

module.exports = router
