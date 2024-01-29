var express = require('express');
const multer = require('multer');
var router = express.Router();
var category = require('../controller/categorycontroller');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  var upload = multer({ storage: storage })

router.post('/cat',upload.single('cat_image'),category.cat_insert);
router.post('/subcat',category.sub_cat_insert);
router.get('/get_data',category.get_cat);
router.get('/sub',category.get_subcat);




module.exports = router;
