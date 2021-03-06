const express = require('express');
var http = require('http');
const app = express();
const querystring = require('querystring');
const request = require('request');

/**
 * http get网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpGet(host, data, path, status,cookies) {
    console.log('===================HttpGet=====================');
    var options = {
        host: host,
        port: 80,
        path: path + querystring.stringify(data),
        method: 'GET',
        encoding: null,
        headers: {
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
        },
        cookies:cookies
    };
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443;
    }

    return new Promise(function(resolve, reject) {
        let body = '';
        var get_req = http.request(options, function(response) {
            //response.setEncoding('utf8');
            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', () => {
                //console.dir(body)
                resolve(body);
            });

            response.on('error', err => {
                reject(err);
            });
        });
        get_req.end();
    });
}

/**
 * http ajaxget网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function ajaxGet(host, data, path, status,cookies) {
    console.log('===================HttpGet=====================');
    var options = {
        host: host,
        port: 80,
        path: path + querystring.stringify(data),
        method: 'GET',
        encoding: null,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Connection: 'keep-alive',
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
        },
        cookies:cookies
    };
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443;
    }

    return new Promise(function(resolve, reject) {
        let body = '';
        var get_req = http.request(options, function(response) {
            //response.setEncoding('utf8');
            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', () => {
                resolve(body);
            });

            response.on('error', err => {
                reject(err);
            });
        });
        get_req.end();
    });
}

/**
 * httpMobileGet  get网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpMobileGet(host, data, path, status,cookies) {
    console.log('===================httpMobileGet=====================');
    var options = {
        host: host,
        port: 80,
        path: path + querystring.stringify(data),
        method: 'GET',
        encoding: null,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
        },
        cookies:cookies
    };
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443;
    }

    return new Promise(function(resolve, reject) {
        let body = '';
        var get_req = http.request(options, function(response) {
            //response.setEncoding('utf8');
            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', () => {
                resolve(body);
            });

            response.on('error', err => {
                reject(err);
            });
        });
        get_req.end();
    });
}

/**
 * http POST 请求
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpPost(host, data, path, status,cookies) {
    var data = querystring.stringify(data);
    console.log('---------httpPost---------------');
    console.log(data);
    var options = {
        host: host,
        port: '80',
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
            'Content-Length': Buffer.byteLength(data), //返回字符串实际占据的字节长度
        },
        cookies:cookies
    };
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443;
    }
    return new Promise(function(resolve, reject) {
        let body = '';
        var post_req = http.request(options, function(response) {
            //console.log(response.statusCode);
            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', () => {
                resolve(body);
            });

            response.on('error', err => {
                reject(err);
            });
        });

        post_req.write(data);
        post_req.end();
    });
}
/**
 * simplehttp POST 请求
 * @param {string} url
 * @param {bool} true false 是否为https
 * @returns
 */
function simpleHttpPost(url,status){
    // http://music.163.com/api/search/pc?s=踩踩踩&offset=1&limit=100&type=1
    console.log('---------simpleHttpPost---------------');
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443;
    }
    return new Promise(function(resolve, reject) {
        let body = '';
        request.post(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                 resolve(body) // Show the HTML for the baidu homepage.
            }
})

    });
    // request.post(url, function (error, response, body) {
    // if (!error && response.statusCode == 200) {
    //     console.log(body) // Show the HTML for the baidu homepage.
    // }
    // })
}
module.exports = {
    httpGet,
    httpPost,
    httpMobileGet,
    ajaxGet,
    simpleHttpPost,
};