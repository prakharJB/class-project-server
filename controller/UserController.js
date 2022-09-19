const routes = require("express").Router();
const User = require("../models/user");
const sha1 = require("sha1");

routes.post("/" , (req, res)=>{
  req.body.password = sha1(req.body.password);
  delete req.body.re_password;

   User.insert(req.body, (err)=>{
     res.send({success : true});
   })  
});


routes.get("/", (req,res)=>{
  User.find({},(err,result)=>{
    res.send(result)
  })
});


module.exports  = routes;