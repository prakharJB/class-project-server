const routes = require("express").Router();
const Category = require("../models/category");
const mongodb = require("mongodb");
const Product = require("../models/product");

routes.post("/" , (req, res)=>{
   Category.insert(req.body, (err)=>{
     res.send({success : true});
   })  
});

routes.get("/", (req,res)=>{
  Category.find({}, (err,result)=>{
    res.send(result)
  })
});

routes.get('/:id',(req ,res)=>{
  var objid = mongodb.ObjectId(req.params.id)

  Category.find({_id : objid}, (err, result)=>{
    res.send(result[0]);
  })
});

routes.delete('/:id',(req ,res)=>{
  var objid = mongodb.ObjectId(req.params.id)

  Category.find({_id : objid} , (err , result)=>{
    var catename = result[0].name;
    
  
    Category.delete({_id : objid}, (err)=>{
      Product.delete({category : catename},(err)=>{
        res.send({success : true});

      })
    })
  })
});

routes.put('/:id',(req ,res)=>{
  var objid = mongodb.ObjectId(req.params.id)
       Category.update({_id : objid}, req.body, (err)=>{
      
        res.send({success : true})
      })
     
});


module.exports  = routes;