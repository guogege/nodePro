/**
 * Created by guo on 2017/3/29.
 */
"use strict";
const querystring = require('querystring');
module.exports = function(req,next){
    if('content-length' in  req.headers){

        let streamData= "";
        req.on('data',function(chunk){
            streamData += chunk;

        })
        req.on('end',function(){
            req.body = querystring.parse(streamData);
            next();
        })
    }else{

        req.body={};
        next();
    }
}