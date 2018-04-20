var express = require('express');
var Server = require('../../utils/httpServer');
var router = express.Router()
router.get('/',function(req,res){
    var searchname=req.param('searchname')
    var url="http://music.163.com/api/search/pc?s="+searchname+"&offset=1&limit=100&type=1"
    //false:http请求  true:https请求
    Server.simpleHttpPost(url, false)
        .then(function(body) {
            return res.send({
                code: 200,
                data: body,
                msg: '',
            });
        })
        .catch(function(err) {
            res.send({
                code: 404,
                msg: '网络好像有点问题',
            });
            console.log(err);
        });
})

module.exports = router;