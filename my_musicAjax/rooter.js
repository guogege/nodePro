/**
 * Created by zhang on 2017/3/26.
 */
//
"use strict";
const url = require('url');

const handler = require('./handler');
let musicList = [
    {
        id: '1',
        name: '演员',
        singer: '薛之谦',
        isHightRate: true
    },
    {
        id: '2',
        name: '丑八怪',
        singer: '薛之谦',
        isHightRate: false
    },
    {
        id: '3',
        name: 'Fade',
        singer: 'Alan Walker',
        isHightRate: true
    },
    {
        id: '4',
        name: '想着你的感觉',
        singer: '容祖儿',
        isHightRate: true
    },
    {
        id: '5',
        name: '叽咕叽咕',
        singer: '徐佳莹',
        isHightRate: false
    }
];

module.exports = function(req,res){
    let method = req.method;
    let urlObj = url.parse(req.url,true);
    let pathname = urlObj.pathname;
    res.writeHead('200',{
        'Content-Type' : 'text/html;charset=utf-8'
    })
    if(method == "GET" && pathname == '/'){
        handler.showIndex(req,res)
    }

    if(pathname=="/getJson"){
     handler.getMusicList(req,res);
    }

    if(method == "GET" && pathname == '/add'){
        handler.showAdd(req,res);
    }

    if(method == "POST" && pathname == "/add"){
        //musicList.find(function(value,index,arr))
        handler.doAdd(req,res);
    }

    if(method=="GET" && /remove\/(\d+)/.test(pathname)){
        handler.doRemove(req,res);
        //res.end('remove success');
    }

    if(method=="GET" && /edit\/(\d+)/.test(pathname)){
        handler.showEdit(req,res);
    };

    if(method == "POST" && /edit\/(\d+)/.test(pathname)) {
        handler.doEdit(req,res);
    }

}