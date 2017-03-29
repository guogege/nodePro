/**
 * Created by zhang on 2017/3/12.
 */
"use strict";

const http = require('http');
const server = http.createServer();
const url = require('url');
const rooter = require('./rooter');
const staticServer = require('./common/static-server');
const bodyParse = require('./common/body-parse');

server.on('request',function(req,res){

    req.query = url.parse(req.url,true).query;
    req.param = url.parse(req.url).pathname

    staticServer(req,res,function(){
        bodyParse(req,function(){
            rooter(req,res);
        })
    })
});

server.listen(3000,'127.0.0.1',function(){
    console.log('server is running');
})