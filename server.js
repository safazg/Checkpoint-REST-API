const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");


//4-create the schema//
const User = require("./models/User");



//3-steup env variables//
require("dotenv").config({path: "./config/.env"})


//PARSE THE DATA TO JSON//
app.use (express.json());


//2-connect the database//
connectDB()

/******START THE CRUD********/
//GET ALL USERS
//PATH :/api/users
app.get("/api/users" , (req , res)=>{
    User.find().then(users => res.send({msg :"GET USERS" , users}))
    .catch(err => res.send({msg : "ERROR" , err}));
});


//GET USER BY ID
//PATH :/api/users/:userID
app.get("/api/users/:userID" ,(req ,res) =>{
    const userID = req.params.userID;
    User.findById(userID).then(user =>{
        res.send({msg : "GET USER BY ID" , user});
    }).catch(err => res.send({msg : "ERROR" , err}));
});


//ADD A USER
// PATH :/api/add_user
app.post("/api/add_user" , (req , res) =>{
    const {name , lastName, email,phone} = req.body;
    const newUser = new User({name, lastName,email,phone});
    newUser.save()
    .then((user)=> res.send({msg : "User added with success" ,  user}))
.catch((err) => res.send({msg : "ERROR ADD" , err}));
});

//EDIT USER BY ID
//PATH :/api/users/:userID
app.put("/api/users/:userID" , (req ,res)=>{
    const id = req.params.userID;
    User.findByIdAndUpdate(id , { ...req.body} , {new : true})
    .then(user => res.send({msg : "USER UPDATED" , user}))
    .catch(err=> res.status(400).send({msg : "EDIT ERROR" , err}));
});


//REMOVE USER BY ID
//PATH :/api/users/:userID
app.delete("/api/users/:userID" , (req , res) =>{
    const id = req.params.userID;
    User.findByIdAndDelete(id)
    .then((user) => res.send({msg : "USER DELETED" , user}))
    .catch(err => res.status(400).send({msg : "ERROR" , err}))
})



/******END THE CRUD ********/


//1-Start the server://
const port = 5000 ;
app.listen(port , ()=>{
    console.log(`The server is Running on port : http://localhost:${port}`)
});
