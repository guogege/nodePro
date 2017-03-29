/**
 * Created by guo on 2017/3/29.
 */
"use strict";
const fs = require('fs');
const path = require('path');
const render = require('./common/render');
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

exports.showIndex = function(req,res){
    render(res,'index');
};
exports.getMusicList = function(req,res){
    res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
    })
    res.end(JSON.stringify({
        musicList:musicList
    }))
}
exports.showAdd = function(req,res){
    //fs.readFile(path.join(__dirname,'view/add.html'),'utf-8',function(err,data){
    //    if(err){
    //        throw err.message;
    //    }
    //
    //    res.end(data);
    //})
    render(res,'add')
}
exports.doAdd = function(req,res){
    let id = req.body.id;
    let name = req.body.name;
    let singer = req.body.singer;
    let isHightRate = req.body.isHightRate;

    let exists = musicList.find((value)=>{
        return value.id == id
    })
    isHightRate = isHightRate === '1' ? true : false;
    if(exists){
        res.end('this song is exist');
    }
    musicList.push({
        id,
        name,
        singer,
        isHightRate
    });
    res.writeHead(302, {
        'Location': 'http://127.0.0.1:3000/'
    });
    res.end('success');
}

exports.showEdit = function(req,res){
    var editId =req.param.match(/edit\/(\d+)/)[1];
    let musicInfo = musicList.find(value=>{
        return value.id == editId;
    })

    render(res,'edit',{
        musicInfo
    })
}

exports.doEdit = function(req,res){
    let id = req.param.match(/edit\/(\d+)/)[1];
    let name = req.body.name;
    let singer = req.body.singer;
    let isHightRate = req.body.isHightRate;

    isHightRate = isHightRate === '1' ? true : false;

    let index = musicList.findIndex(value=> {
        return value.id == id;
    })
    musicList.splice(index, 1, {
        id,
        name,
        singer,
        isHightRate
    });
    res.writeHead(302, {
        'Location': 'http://127.0.0.1:3000/'
    });
    res.end('success');
}

exports.doRemove = function(req,res){
    var delId = req.param.match(/remove\/(\d+)/)[1];

    let index = musicList.findIndex(value=>{
        return value.id == delId
    })

    try{
        musicList.splice(index,1);
        res.end(JSON.stringify({
            code:1,
            msg:'ok'
        }))
    }catch(e){
        res.end(JSON.stringify({
            code:'0',
            msg:e.message
        }))
    }
}