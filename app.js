const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const ejs = require("ejs");


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/phone").then(() =>  console.log(" DB connect succesfulyyy")).catch(err => console.log( err))

const newSchema = new mongoose.Schema({
    name: String,
    role: String
})

const user = mongoose.model("userData" , newSchema);

app.get("/" , async (req, res) =>{
    const allData = await user.find();

    res.render("index" , {data:allData});
})

app.post("/post" ,  async(req, res) =>{
    console.log(req.body);
    let userName = req.body.uNmae;
    let userRole = req.body.role;
    const userOne = new user({
        name : userName,
        role:userRole
    })
    userOne.save().then(() =>{
        res.redirect("/");
        console.log("date save succussfully");
    }).catch(err => console.log(err))


   
})

app.get("/delete/:id" ,  (req, res) =>{
    let id  = req.params.id;
    user.deleteOne({_id : id}).then(() =>{
        res.render("/");
    })
})

app.get("/update/:ud" , async (req, res) =>{
    let id = req.params.ud;
    if(id){
        let bottle = await user.findById(id)
        res.render("update", {data2:bottle});
    }else{
        console.log(req.body.role);
    }
})

app.post("/updateUSer/:id" , (req, res) =>{
    let id  = req.params.id;
    let uNmae = req.body.uNmae;
    let uRole = req.body.uRole;

    user.updateOne({_id:id} , {$set:{name:uNmae, role:uRole }})
    .then(()=>{
        res.redirect("/");
    }).catch(err => console.log(err))
  
})



app.listen(3000, () =>{
    console.log("port is listing on port 30000");
})
