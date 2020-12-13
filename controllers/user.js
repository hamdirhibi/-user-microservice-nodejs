const router = require('express').Router() ; 
const User = require('../models/user');
const {registerValidation,loginvalidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtOptions} = require('../config/jwtOptions');
const notification = require('../models/notification');
const Opportunity = require('../models/opportunity');
const Skill = require('../models/skill');
const Application = require('../models/application');

var ObjectID = require('mongodb').ObjectID;



exports.user_signup= async (req,res)=>{
    //Data Validation 
     const {error} =  registerValidation  (req.body);
   
     if (error) return res.status(400).send(error.details[0].message)

    //checking if email exist 
    const emailExist = await User.findOne({
        email : req.body.email 
    })

    if (emailExist) return res.status(400).send('Email exist  ') ; 

    //Hash passwords
    const salt = await bcrypt.genSalt(10);  
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    let skills = [];
    skills = req.body.skills ;
    let image = null ;
    if (req.files!=undefined)
        image = req.files[0].originalname;
    const usertoSave = new User ({
       name : req.body.name ,
       address : req.body.address ,
       phone : req.body.phone ,
       email : req.body.email , 
       password : hashPassword ,
       skills : skills , 
       image :  image,
       summary : req.body.summary,
       role : req.body.role
        });
        try {
            const user = await usertoSave.save()
            let payload = { user };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);

           return res.status(200).json({ message: 'ok', token  , ROLE : user.role });

            
        }catch (err){
            res.status(400).json({error : err}); 
        }
    }


exports.user_login = async (req,res)=>{
    console.log('login here ') ; 
    const {error} = loginvalidation(res.body) ; 

    if (error) return res.status(400).json({error : error.details[0].message}) ; 

    const user = await User.findOne({
        email : req.body.email  
    }) 
    if (!user) return res.status(400).json({error : "invalid Email"}); 
    
    
    //PASSWORD IS CORRECT 
    bcrypt.compare( req.body.password , user.password, (err, result) =>{
        if(err){
             res.status(403).json({error : 'Incorrect Password'});
        }
        if(result){
            let payload = { user };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);

           return res.status(200).json({ message: 'ok', token  , ROLE : user.role });
        }
        else{
          return  res.status(403).json({error : 'incorrect password'});
        }

    })

}

exports.getUserById = async (req,res) =>{
    try {
        
        const user = await User
        .findById(req.userData.user_id)
        .populate({path:'opportunities',Model : Opportunity })
        .populate({path:'skills',Model : Skill})
        .populate({path:'applications',Model : Application})

        
        res.json(user)
    }
    catch(err){
        res.json({message: err})
    }
}

exports.getUsers = async (req,res) =>{
    try {
        
        const users = await User.find(
            {
            role : {
                '$regex' : '^((?!ADMIN).)*$'
            }
        }
        ) ;

        res.json(users)
    }
    catch(err){
        res.json({message: err})
    }
}


exports.deleteUser = async (req,res) =>{
    try {
        const user = await User.findById(req.params.userId); 
        
        if (!user) {
            return res
            .status(409)
            .json({ message: "User  doesn't  exist ! " });
        }

        

        await notification.deleteMany({
            user : req.params.userId
        }) ; 

        await user.deleteOne({
            _id : req.params.userId
        })

        res.status(200).json({message : 'Successfully deleting user '}); 
    }
    catch(err){
        res.json({message: err})
    }
}



exports.user_current = async function(req, res) {
    try {
        
        const user = await User
        .findById(req.userData.user._id)
        .populate({path:'opportunities',Model : Opportunity })
        .populate({path:'skills',Model : Skill})
        .populate({path:'applications',Model : Application})

        res.json(user)
    }
    catch(err){
        res.json({message: err})
    } 
}

exports.updateProfilePicture = async (req,res) =>{
    try {
        let image = null ;
        if (req.files!=undefined)
            image = req.files[0].originalname;

        await  User.updateOne(
            {_id :req.userData.user._id } ,
                {
                    $set : {
                        image : image
                    }
                }

        )
    }
    catch(err){
        res.json({message: err})
    }
}
exports.updatesAccountData = async (req,res)=>{

    try {

        console.log(req.files[0].path);
        console.log(req.userData.user._id);
        
        const userUpdated=await User.findOneAndUpdate(
            {_id : ObjectID(req.userData.user._id )} ,
                {
                    $set : {
                        name : req.body.name ,
                        address : req.body.address ,
                        phone : req.body.phone ,
                        email : req.body.email , 
                        image :  req.files[0].path,
                        summary : req.body.summary,
                    }
                }

        ).exec() ; 
        res.status(200).json(userUpdated); 


    }
    catch(err){
        console.log(err)
        res.status(400).json({message: err})
    }


}