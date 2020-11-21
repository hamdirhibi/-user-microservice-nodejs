const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({
    content :  {
        type : String ,
        required : true , 
    },
    createdAt : {
        type : Date  , 
        required : true , 
    },
    seen : {
        type : Boolean ,
        required : true 
    },
    type : {
        type : String , 
        require : true 
    },
    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
})




module.exports = mongoose.model("notification", notificationSchema);
