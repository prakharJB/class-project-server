const express = require("express");
const app = express();
const cors = require("cors");
const fileupload = require("express-fileupload");


app.use(express.static(__dirname+"/assets"));
app.use(express.json());
app.use(express.urlencoded());
app.use(fileupload());

app.use(cors());

app.use(require("./config/routes"));

app.get("*", (req , res)=>{
    res.sendFile(__dirname+"/index.html");
})




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server run")
})