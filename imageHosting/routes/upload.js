/**
 * Created by weixing on 2015/10/12.
 */

var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
})

router.get('/', function(req, res, next) {
    res.send('image hosting upload default router');
});

router.post('/upload',function(req,res,next){
    res.send('upload file');
});

module.exports = router;
