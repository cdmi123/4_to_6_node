var express = require('express');
var router = express.Router();
var user = require('../controller/usercontroller');
var logincontroller = require('../controller/logincontroller');
var auth = require('../middleware/auth');


router.get('/',user.index);

router.post('/login',logincontroller.login);
router.get('/logout',logincontroller.logout);




module.exports = router;
