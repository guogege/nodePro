/**
 * Created by zhang on 2017/3/27.
 */
/**
 * Created by zhang on 2017/3/12.
 */
"use strict";

const http = require('http');
const rooter = require('./2.js')
const server = http.createServer();
server.on('request',function(req,res){

    //rooter(req,res);
    //a()
    res.end('1');
    setTimeout(function(){
        console.log(22)
    },1000)

});


server.listen(3000,'127.0.0.1',function(){
    console.log('server is running');
})