const routes = require("express").Router();
const Admin = require ("../models/admin");
const sha1 = require ("sha1");
const jwt = require("jsonwebtoken");

routes.post("/",(req , res)=>{

    //console.log(req.body, "---------------------");
    var u = req.body.username;
    var p = sha1(req.body.password);

    Admin.find({username :u},(err, result)=>{
      // console.log(result)

        if(result.length > 0)
        {
            if(result[0].password == p)
            {
                var token = jwt.sign(result[0]._id.toString() , "the stepping stone");
                res.status(200).send({success : true , token : token})

            }else{
                res.status(401).send({ success:false, type : 2})

            }
        }
        else{
            res.status(401).send({ success:false, type : 1})
        }
    })
});




module.exports = routes;
