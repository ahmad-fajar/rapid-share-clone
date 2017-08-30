var express = require('express');
var router = express.Router();
var controller = require('../controller/fileController')

router.get('/', controller.readFile);
router.post('/', controller.createFile);
router.put('/:id', controller.updateFile);
router.delete('/:id', controller.deleteFile);

module.exports = router;
