const routes = require("express").Router();
const Product = require("../models/product");
const mongodb = require("mongodb");
const rand = require("random-string-gen")
const path = require("path");

routes.post("/" , (req, res)=>{
  //console.log(req.body);
  var data = JSON.parse(req.body.proinfo);
  var photo = req.files.photo;
  var name = photo.name;
  var arr = name.split(".");
  var ext = arr[arr.length-1];
  var randname = rand(20)+"."+ext ;

  data.image = randname;
  // console.log(data)
  //console.log(req.files)

  var filepath = path.resolve()+"/assets/product-images/"+randname;

  photo.mv(filepath,(err)=>{
    Product.insert(data , (err)=>{
      res.send({success : true});
  })  

  })
  
});

routes.get("/", (req,res)=>{
  Product.find({}, (err,result)=>{
   // res.send(result)
   var newresult =[];
   newresult = result.map((x)=>{
    x.image = "http://localhost:3000/product-images/"+x.image;
    return x;
   })
   res.send(newresult);
  })
})

routes.get('/:id',(req ,res)=>{
  var objid = mongodb.ObjectId(req.params.id)

  Product.find({_id : objid}, (err, result)=>{
    res.send(result[0]);
  })
});

routes.delete('/:id',(req ,res)=>{
  var objid = mongodb.ObjectId(req.params.id)

  Product.delete({_id : objid}, (err, result)=>{
    res.send({success : true});
  })
});

routes.put('/:id',(req ,res)=>{
  var objid = mongodb.ObjectId(req.params.id)
 
  Product.update({_id : objid}, req.body, (err)=>{
    res.send({success : true})
  }) 
}) ; 

routes.get("/search/latest",(req,res)=>{

  var objid = mongodb.ObjectId(req.params.id)
  Product.find_last({}, (err, result)=>{
    if(result.length){

      result[0].image = "http://localhost:3000/product-images/"+result[0].image
      res.send(result[0]);
    }else{
      res.send({});
    }
  })
})

module.exports  = routes;