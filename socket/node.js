var express = require('express')
var app = express()
//파이썬 쉘
var PythonShell = require('python-shell')
var WebSocketS = require("ws").Server;
var wss = new WebSocketS({ port: 3010 });
var donwloadList = [];
wss.on("connection", function (ws) {
    
    ws.on("message", function (message) {
        // message를 파싱
        var parse = JSON.parse(message);
        console.log(parse.url);
        console.log("Received: %s", message);
        var options = {
            mode: 'text',
            pythonPath: 'python3',
            pythonOptions: ['-u'],
            scriptPath: '',
            args: [parse.url, parse.id]  // 인풋은 이렇고 아웃풋은 검사결과랑 파일넘버
        };
        PythonShell.run('main.py', options, function (err, result) {
            //console.log('results: %j',result);
            ws.send(JSON.stringify({'id':result[0],'stat':result[1]}));
            console.log(JSON.stringify({'id':result[0],'stat':result[1]}));
            //wss.send('downlaod complete');
            if (err) throw err;
        });
        
    });
});

