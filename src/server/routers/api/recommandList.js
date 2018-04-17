//音乐排行榜
const express = require('express');
const app = express();
const Server = require('../../utils/httpServer');
const router = express.Router()

var cheerio = require('cheerio');
router.get('/', function(req, res) {
    var host = 'music.163.com';
    var path = '/discover/toplist';
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            var $ = cheerio.load(body,{decodeEntities: false});    
            var captionList = $(".f-hide").children('li'); 
            //console.dir("ssdadfasdsd"+body )
            var itemList = [];  
            captionList.each(function(item) {  
                var cap = $(this);   
                var item = {  
                    title: cap.find('a').text(),  
                    linkUrl: cap.find('a').attr('href')  
                }  
                itemList.push(item);  
            });  
            return res.send({
                code: 200,
                data: itemList,
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