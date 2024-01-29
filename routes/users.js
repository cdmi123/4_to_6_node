var express = require('express');
var router = express.Router();
var admin = require('../controller/admincontroller')


router.post('/',admin.index);
router.get('/delete/:id',admin.delete);
router.post('/update/:id',admin.update);
router.get('/',admin.check);




module.exports = router;
