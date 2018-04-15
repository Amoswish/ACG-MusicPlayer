//音乐排行榜
const express = require('express');
const app = express();
const Server = require('../utils/httpServer');
const router = express.Router()
router.get('/', function(req, res) {
    var host = 'm.kugou.com';
    var path = '/rank/list&json=true';
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            //res.send(JSON.parse(body)['rank'])
            return res.send({
                code: 200,
                data: JSON.parse(body)['rank'],
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
});

module.exports = router;