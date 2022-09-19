const database = require("../config/database");
const collName = "category";
const dbName = "api-project";

module.exports.insert= (obj,cb)=>{
    database((err,con)=>{
        var db = con.db(dbName);
        db.collection(collName).insertOne(obj,cb);
    })
}

module.exports.find = (where , cb)=>{
    database((err, con)=>{
        var db = con.db(dbName);
        db.collection(collName).find(where).toArray(cb)
    })
}

module.exports.update =(where,obj , cb)=>{
    database((err,con)=>{
        var db = con.db(dbName);
        db.collection(collName).updateMany(where, {$set : obj}, cb);
    })
}

module.exports.delete = (where, cb)=>{
    database((err,con)=>{
        var db = con.db(dbName);
        db.collection(collName).deleteMany(where, cb);
    })
}