/**
 * Created by weixing on 2015/10/12.
 */


var express = require('express');
var crypto = require('crypto');
var redis = require('redis');

var router = express.Router();
var client = redis.createClient(6379,'127.0.0.1', {'return_buffers': true});

var fileSys = require('fs');

client.on('error',function(error){
    console.log(error);
});

var multer  = require('multer');//file upload header parser
var t = multer({dest:'./uploads'});

router.get('/', function(req, res, next) {
    res.render('uploadform');
});
router.post('/', t.single('photo'),function(req,res,next){
    fileSys.readFile(req.file.path, function (err, data) {
        if (err) throw err;
        fileSys.unlink(req.file.path);
        var md5 = crypto.createHash('md5');
        md5.update(data);
        var key = md5.digest('hex');
        client.set(key,data, function(error, r) {
            res.send(key);
        });
    });
});

router.get('/:key',function(req,res){
    var key = req.params.key;
    client.get(key,function(error,data){
        if(error) throw error;
        res.writeHead(200,{'Content-Type':'image/png'});
        res.end(data,'binary');
    });
});

router.get('/test/:key',function(req,res){
    fileSys.readFile('uploads/1.png',function(error,data){
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(data,'binary');
    });
});


module.exports = router;
