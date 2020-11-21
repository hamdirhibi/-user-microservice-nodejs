const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema({
    title :  {
        type : String ,
        required : true , 
    },
    date : {
        type : String , 
        required : true 
    },
    description : {
        type : String , 
        required : true 
    },  
    cover : {
        type : String , 
        required : false 
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    duration : {
        type : Number , 
        require : true 
    }


    
})




module.exports = mongoose.model("session", sessionSchema);
