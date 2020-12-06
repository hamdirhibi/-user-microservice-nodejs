const mongoose = require("mongoose");


const opportunitySchema = new mongoose.Schema({
    title :  {
        type : String ,
        required : true , 
    },
    description :  {
        type : String ,
        required : true , 
    },
    date : {
        type : Date , 
        required: true 
    },
    type : {
        type : String , 
        require : true 
    },
    duration : {
        type : String  , 
        required : false , 
    },
    sallary : {
        type : Number , 
        required : true 
    },
    contractType : {
        type : String , 
        required : false 
    },
    cover : {
        type : String , 
        required : false 
    },
    skills : [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill",
        required: true,
    } 
    ],
    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }

})
module.exports = mongoose.model("opportunity", opportunitySchema);
