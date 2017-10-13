const api = require('api.js');
const dateFormat = require('dateFormat.js');

const TOKEN = "f580a93a3cacd178bf7d2f2a7e79f3982c7990d908a008f7ee5cf50388f00877";

/*
 * 请求封装
 * 返回 promise
 */
function request(params) {
  return new Promise(function (resolve, reject) {

    if (!params) {
      reject(new Error(params));
    }

    params.data = params.data || {};
    params.data['access_token'] = TOKEN;

    wx.request({
      url: params.url,
      method: params.method || "GET",
      data: params.data,
      success: function(res){
        if (res.statusCode === 200 || res.statusCode === 201){
          resolve(res);
        }else{
          console.log('[error]: ', res)
          reject(res);          
        }
      },
      fail: function(res) {
        reject(res);
      }
    })
  })
}

/*
 * 过滤 html 标签
 * filterHtml("<p>hello world!</p>") => "hello world!"
*/
function filterHtml(html) {
  return (html || "").replace(/<.*?>/g,"");
}

/*
 * 每三位加上逗号
 * 123456789 => 123,456,789
*/
function addCommas(value) {
  return parseFloat(value || 0).toLocaleString();
}

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds();


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function parseHtml(htmlBlock) {
    var parser = new DOMParser();
    return parser.parseFromString(htmlBlock, "text/html");
}

function json2Form(json) {
    var str = [];
    for(var p in json){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

module.exports = {
  api: api,
  
  filterHtml: filterHtml,
  dateFormat: dateFormat,
  request: request,
  addCommas: addCommas,
	formatTime: formatTime,
	parseHtml: parseHtml,
	json2Form: json2Form
}
