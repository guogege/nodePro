/**
 * Created by guo on 2017/3/29.
 */
"use strict";
const fs = require('fs');
const underTemplate = require('underscore');
const path = require('path');
module.exports = function(res,viewPath,dataObj){
    res.writeHead('200',{
        'Content-Type' : 'text/html;charset=utf-8'
    })
    fs.readFile('./view/'+viewPath+'.html','utf-8',function(err,data){
        if(err){
            throw err.message;
        }
        let compile = underTemplate.template(data);

        let htmlStr = compile(dataObj)
        res.end(htmlStr);
    })
};