
var option = {
    uri:    'http://music.163.com/#/search',   // 请求的URL
    method: 'GET',                   // 请求方法
    gzip:true,
    headers: {                       // 指定请求头
      hostname: 'music.163.com',
      connection: 'keep-alive',
      //'Upgrade-Insecure-Requests': 1,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      referer: 'http://music.163.com/',
      'accept-encoding': 'gzip, deflate',
      'accept-language': 'zh-CN,zh;q=0.9',
      cookie:' JSESSIONID-WYYY=bvxzhx8%5C6XKzndvsWSM4wlC6Q4kUwP4u1wr2GFcZ621eUdRPRtdaKN4Y4OG1ACr5%5CUf2j03%5CoTN8yb%5CJZ3%2FmCxqpWmpY55RekAixhyAWFmpgY31glPlSkOzsghSd%2BwBt8jn%2Br1YnOf5c0l7ezhMs0cE3c4HOgcV0QCJ3WEjGKwefVnyl%3A1521165227174; _iuqxldmzr_=32; __utma=94650624.41037501.1521163430.1521163430.1521163430.1; __utmb=94650624.2.10.1521163430; __utmc=94650624; __utmz=94650624.1521163430.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _ntes_nnid=74c6acd60fa3e7f9b04d37274e10a498,1521163427313; _ntes_nuid=74c6acd60fa3e7f9b04d37274e10a498',
    },
  }
     var request = require('request');
     var http = require('http'); 
     var cheerio = require('cheerio');
  function post(option) {
    return new Promise ((resolve, reject) => {
      request(option, function (error, response, body) {
          var $ = cheerio.load(body,{decodeEntities: false});  
          var captionList = $(".f-hide").children('li');
          var itemList = [];
          captionList.each(function(item) {  
              var cap = $(this);  
              //console.log(cap.find('h3').text());  
              var item = {  
                  title: cap.find('a').text(),  
                  linkUrl: cap.find('a').attr('href')  
              }  
              console.log(item);
              itemList.push(item); 
              
          }); 
          resolve(itemList);
      }); 
    });
  }
  //使用它
  async function foo() {
    let result = await post(opts);
    console.log(resultf)
    return result;
  }