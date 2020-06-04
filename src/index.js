const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const parser = require('fast-xml-parser')
const request = require('request');
const encoding = require('encoding-japanese');
const https=require('https');
const get_json=require('get-json');
let win;

const createWindows = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/js/preload.js'
        }
    })
    win.loadFile(__dirname + '/views/index.html')
}

app.whenReady().then(createWindows);

ipcMain.on('get',(event,arg) => {
  var options = {
    url : 'https://api.p2pquake.net/v1/human-readable',
    method : 'GET'
  }

  https.get(options.url, function (res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log(JSON.parse(chunk));
        event.sender.send('api-reply',JSON.parse(chunk));
    });
  }).on('error', function (e) {
    console.log(e.message);
});

  /*get_json(options.url,(error,responce)=>{
    console.log('Error:');
    console.log(error);
    console.log('Responce:');
    // responce.setEncode('UTF-8');
    console.log(responce);

    console.log('UTF-8');
    console.log(encoding.convert(responce,{to:'UTF-8',from:'AUTO',type:'string'}));

    // console.log('Json');
    // console.log(JSON.parse(responce));
  });*/

  /*const URL = "https://api.p2pquake.net/v1/human-readable";

https.get(URL, function (res) {
    var body = '';
    res.setEncoding('utf8');
    // res.header('Content-Type', 'text/plain;charset=utf-8');
    res.on('data', function (chunk) {
        console.log(chunk);
    });
  }).on('error', function (e) {
    console.log(e.message);
});*/


  /*const req=https.request(options.url,(res)=>{
    res.setEncoding('UTF-8');
    res.on('data',(chunk)=>{
      // chunk.setEncoding('UTF-8');
      console.log('Raw');
      console.log(chunk);
      console.log('UNICODE');
      console.log(encoding.convert(chunk,{to:'UNICODE',from:'BINARY',type:'string'}));
      console.log('SJIS');
      console.log(encoding.convert(chunk,{to:'SJIS',from:'BINARY',type:'string'}));
      console.log('UTF-8');
      console.log(encoding.convert(chunk,{to:'UTF-8',from:'BINARY',type:'string'}));
    });
    res.on('end',()=>{
      console.log('END');
    });
  });
 req.end();*/


  /*request('https://api.p2pquake.net/v1/human-readable?limit=1',(error,responce,body)=>{
    if(error !== null){
      console.error("Error:",error);
      event.sender.send('api-reply','');
      console.log("Responce:",'');
      return false;
    }

    var xmlOption = {
        attributeNamePrefix : "",//Attribute名の先頭prefixを指定しない
        ignoreAttributes : false//XMLのattributeを取るためにはtrue
    }

    ;
    // console.log("body:",body);
    console.log("body_unicode",encoding.convert(body,{to:'UNICODE',from:'UTF-8',type:'string'}));
    event.sender.send('api-reply',JSON.parse(encoding.convert(body,{to:'UNICODE',from:'UTF-8',type:'string'})));
    console.log("Responce:",JSON.parse(encoding.convert(body,{to:'UNICODE',from:'UTF-8',type:'string'})));
  })*/
})
