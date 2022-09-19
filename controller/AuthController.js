const routes = require("express").Router();
const user = require("../models/user");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");


routes.post("/",(req, res)=>{
    //res.status(200).send({success:true})
    //res.status(401).send({success:false})
    var e= req.body.email;
    var p = req.body.password;
    

    user.find({email : e}, (err, result)=>{
         //console.log(result);
         //return;
    
        if(result.length > 0)
        {
            if(result[0].password == sha1(p))
            {
                var token = jwt.sign(result[0], "the stepping stone")
                res.status(200).send({success : true, token : token, name : result[0].name})

            }else{
                res.status(401).send({type :2});

            }

        }
        else{
            res.status(401).send({type : 1});
        }
    })
});

module.exports = routes;