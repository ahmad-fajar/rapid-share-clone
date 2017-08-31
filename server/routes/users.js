var express = require('express');
var router = express.Router();
var controller = require('../controller/userController')

router.get('/', controller.readUser);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
