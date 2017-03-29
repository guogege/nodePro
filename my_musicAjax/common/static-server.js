/**
 * Created by guo on 2017/3/29.
 */
"use strict";
const url = require('url');
const mime = require('mime');
const fs = require('fs');
module.exports = function(req,res,next){
    let pathname = url.parse(req.url).pathname;
    if(pathname.startsWith("/www/")){
        var mimeType = mime.lookup(pathname);
        if(mimeType.startsWith('/text')){
            mimeType += ";charset='utf-8'"
        }
        fs.readFile('.'+pathname,function (err, data) {
            res.writeHead(200,{
                "Content-Type":mimeType
            })
            res.end(data);
        });
    }else{
        next()
    }

}
