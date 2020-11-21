const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const checkAuth = require("../middleware/checkAuth");
let upload = require('../config/multer.config.js');




router.post("/signup", upload.any()  , UserController.user_signup);
router.post("/login", UserController.user_login);
router.get("/current", checkAuth, UserController.user_current);
router.get("/", checkAuth, UserController.getUsers);
router.delete("/:userId", checkAuth ,  UserController.deleteUser);



module.exports = router ; 
