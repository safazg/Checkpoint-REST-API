const mongoose = require("mongoose");



function connectDB(){
    const options = {
        useNewUrlParser: true ,
        useUnifiedTopology: true,
        useFindAndModify : false,
    };
    mongoose.connect(process.env.MONGO_URL, options).then(()=>{
        console.log("The DATABASE IS CONNECTED.... ");
    }).catch(err=> console.log(err));
}

module.exports = connectDB;