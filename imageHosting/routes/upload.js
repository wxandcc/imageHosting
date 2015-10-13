/**
 * Created by weixing on 2015/10/12.
 */


var express = require('express');
var router = express.Router();


var multer  = require('multer');//file upload header parser
var t = multer({dest:'./uploads'});

router.use(function timeLog(req, res, next) {
    next();
})

router.get('/', function(req, res, next) {
    res.render('uploadform');
});
router.post('/', t.single('photo'),function(req,res,next){
    console.log(req.file);
    res.send('upload file');
});

module.exports = router;
