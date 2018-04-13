//async function getRecommandList(){
  var request = require('request');
  var http = require('http'); 
  var cheerio = require('cheerio');
  var rp = require('request-promise');
  var itemList = [];
  var options = {
      uri:    'http://music.163.com/discover/toplist',   // 请求的URL
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
        cookie:' Province=029; City=029; __gads=ID=e215f357b1f092e1:T=1523029891:S=ALNI_MbNDg80PmVmp8Nfk9Qd0yLV-w8qig; UM_distinctid=1629ba7e052197-01c1c17f126e8c-3a614f0b-144000-1629ba7e054955; vjuids=-1f96d3207.1629ba7e3e8.0.d76fa313380e6; vjlast=1523029894.1523029894.30; _ntes_nnid=74c2e367094763b4fbbca056e131c571,1523029894126; _ntes_nuid=74c2e367094763b4fbbca056e131c571; vinfo_n_f_l_n3=4244478e17f5e0bc.1.0.1523029894134.0.1523030183407; _iuqxldmzr_=32; JSESSIONID-WYYY=Aymw%2B%2FPWG2VMNMePk%5C8BeyTrkw%2F1Tx58BYZrZeBnh%2BorGHvKNX30Wewj90l8FDk%5CgshUilGWxWbOKtrk8WHvQkMHB4IAev%2Ft9QMIK%2BzxZmb47ft%2BW7jJBM%2B%2BmXvi%5CERiBRjm5KPCdzQwHF1%5Crv5ChT5%2BZhGIB9OSx4nWySApmaAJFO6s%3A1523538854685; __utma=94650624.347866220.1523503060.1523503060.1523537055.2; __utmc=94650624; __utmz=94650624.1523537055.2.2.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; WM_TID=hQ0TQQz1ajbtRpMLn8RC%2FLZD3tKg4VAt; __utmb=94650624.3.10.1523537055',
      },
     }
    rp(options)
      .then(function (body) {
          var $ = cheerio.load(body,{decodeEntities: false});  
          //获取html  
          //console.log($.html());  
          //获取文本内容  
          //console.info($.text());  
          //获取文本，将多个空白符 替换成空格  
          //console.info($.text().replace(/\s+/g,' '));  
          //获取文本，将多个空格 替换成一个空  
          //console.info($.text().replace(/[ ]+/g,' '));  
          //获取文件，将多个换行替换成 一个换行  
          //console.info($.text().replace(/(\r\n)+[ ]+/g,'\r\n').replace(/(\r\n)+/g,'\r\n'));  
          //过去文件，将多个连续换行替换成 一个换行  
          //console.info($.text().replace(/(\r\n)+/g,'\r\n'));  
          //解析html内容   
          // itemList[]   
          // {title:'',linkUrl：’‘}  
          var captionList = $(".f-hide").children('li')
          captionList.each(function(item) {  
              var cap = $(this);  
              //console.log(cap.find('h3').text());  
              var item = {  
                  title: cap.find('a').text(),  
                  linkUrl: cap.find('a').attr('href')  
              }  
              itemList.push(item)
              
          })
          console.log(itemList)
          var storage=window.localStorage;
          //写入a字段
          storage["a"]=1;
          //写入b字段
          storage.a=1;
          //写入c字段
          storage.setItem("c",3);
          console.log(typeof storage["a"]);
          console.log(typeof storage["b"]);
          console.log(typeof storage["c"]);
          window.localStorage.setItem('recommandList', JSON.stringify(itemList))
          console.log("sss")
          var data2 = JSON.parse(window.localStorage.getItem('recommandList'))
          console.log(itemList)
          return itemList;
      })
      .catch(function (err) {
        // API call failed...
    });
    function aaa(b){
      return b;
    }
 // }