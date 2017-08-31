var express = require('express');
var router = express.Router();
var controller = require('../controller/fileController')
//var upload = require('../controller/upload')
var images = require('../helper/image')
var fileDB = require('../routes/file')


router.get('/', controller.readFile);
// router.post('/', controller.createFile);
router.put('/:id', controller.updateFile);
router.delete('/:id', controller.deleteFile);
router.post(
  '/add',
  images.multer.single('image'),
  images.sendUploadToGCS,
  controller.saveCloudDataToDB
);

module.exports = router;
