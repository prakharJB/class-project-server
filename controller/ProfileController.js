const routes = require("express").Router();
const User = require("../models/user");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");


routes.get("/",(req, res)=>{
    if(req.headers.authorization){
        var token = JSON.parse(req.headers.authorization);
        var info = jwt.decode(token, "the stepping stone");
        if(info){
            var objid = mongodb.ObjectId(info._id);
            User.find({_id : objid}, (err , result)=>{
                res.send(result[0]);
            }) 

        }else{
            res.send({message : "un-Authorized User"})
        }
        
    }else{
        res.send({message : "un-Authorized User"})
    }
})


routes.post("/",(req, res)=>{
    //console.log(req.body);
    if(req.headers.authorization){
        var token = JSON.parse(req.headers.authorization);
        var info = jwt.decode(token, "the stepping stone");
        if(info){
            var objid = mongodb.ObjectId(info._id);
            // console.log(objid);
            // return;
            delete req.body._id;
            User.update({_id : objid}, req.body, (err , result)=>{
                // if(err){
                //     console.log(err);
                //     return;
                // }
                //res.send(result);
                res.send({success : true})
            }) 

        }else{
            res.send({message : "un-Authorized User"})
        }
        
    }else{
        res.send({message : "un-Authorized User"})
    }
})



module.exports  = routes;