const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  summary : {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    min: 8,
  },
  address: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  role: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  image : {
    type: String,
    require : false 
  },
  skills : [
   {
      type: mongoose.Schema.Types.ObjectId,
      ref: "skill",
      required: true,
   }
  ],
  opportunities : [ 
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "opportunity",
      required: true,
    }
  ],

});

module.exports = mongoose.model("User", userSchema);
