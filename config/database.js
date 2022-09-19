const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongoUrl = "mongodb://localhost:27017";

module.exports = (cb)=>{
    MongoClient.connect(mongoUrl,cb)
    
};