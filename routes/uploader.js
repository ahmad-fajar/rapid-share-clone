const express = require('express')
const router = express.Router(),
const uploader = require('../helpers/uploader')

router.get('/', (req, res) => {
  res.send('testing awal')
})

router.post('/',
  uploader.multer.single('image'),
  uploader.sendUploadToGCS,
  (req, res) => {
    res.send({
      filename: req.file.originalname,
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router
