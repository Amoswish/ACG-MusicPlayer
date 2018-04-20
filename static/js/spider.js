var request = require('request');
request.post('http://music.163.com/api/search/pc?s=踩踩踩&offset=1&limit=100&type=1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the baidu homepage.
  }
})