const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const path = require('path');
dotenv.config();

app.use(express.static(__dirname + './uploads/'));
app.use("/user/uploads", express.static(path.join(__dirname + '/uploads')));


//import routes
const userRoute = require("./routes/user");

// configuration of the rest API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});



//Middlewares
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// route middlewares
app.use("/user", userRoute);


//Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log(" connected to db  ");
  
});

app.listen(port, () => {
  console.log(" micro service user running  ");
})

