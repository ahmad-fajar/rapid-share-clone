var express = require('express');
var router = express.Router();
var controller = require('../controller/fileController')
//var upload = require('../controller/upload')
var images = require('../helper/image')
var fileDB = require('../routes/file')


router.get('/', controller.readFile);
router.post('/', controller.createFile);
router.put('/:id', controller.updateFile);
router.delete('/:id', controller.deleteFile);
// router.post('/upload', upload.uploadFile);
router.post(
  '/add',
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req, res, next) => {
    console.log('sukses');
    res.send({name: req.file.originalname, url: req.file.cloudStoragePublicUrl})
    // let data = req.body;
    //
    // // Was an image uploaded? If so, we'll use its public URL
    // // in cloud storage.
    // if (req.file && req.file.cloudStoragePublicUrl) {
    //   data.imageUrl = req.file.cloudStoragePublicUrl;
    // }
    //
    // // Save the data to the database.
    // getModel().create(data, (err, savedData) => {
    //   if (err) {
    //     next(err);
    //     return;
    //   }
    //   res.redirect(`${req.baseUrl}/${savedData.id}`);
    // });
  }
);

module.exports = router;
