const Joi = require('joi');

//register validation 
const registerValidation = (data)=>{
    const schema = Joi.object().keys( {
         name : Joi.string()
        .min(6)
        .required(), 
        
        address : Joi.string()
        .min(6)
        .required(), 
        phone : Joi.number()
        .min(8)
        .required() , 
        email : Joi.string()
        .min(6)
        .required()
        .email(),
        
        password : Joi.string()
        .min(6)
        .required() ,
        rule : Joi.string()
        .required() ,

        skills : Joi.array() ,
        
        summary : Joi.string() 
        .required()
        
    }
    )
    
    return Joi.validate(data,schema) ; 
    
    
}
//login validation
const loginValidation = (data)=>{
    const schema = Joi.object().keys( {
       
        
        email : Joi.string()
        .min(6)
        .required()
        .email(),
        
        password : Joi.string()
        .min(6)
        .required() 
    }
    )
    
    return Joi.validate(data,schema) ; 
    
    
}
    
//Product validation
const ProductValidation = (data)=>{
    const schema = Joi.object().keys( {
       
        
        name : Joi.string()
        .required(),        
        price : Joi.number()
        .required() ,
        category : Joi.string()
        .required() ,
        price : Joi.number()
        .required() ,
        available : Joi.boolean()
        .required() ,
        unit_qte : Joi.number()
        .required() ,
        unit_id : Joi.string()
        .required() ,
        orderAddress : Joi.string()
        .required 
    }
    )
    
    return Joi.validate(data,schema) ; 
    
    
}

//Product validation
const OrderValidation = (data)=>{
    const schema = Joi.object().keys( {
       
        products : Joi.array()
        .min(1),        
        quantities : Joi.array()
        .min(1),        
        total : Joi.number()
        .required(),        
        phone : Joi.string()
        .required() ,
        deleveryDate : Joi.date()
        .required() ,
        paymentMethod : Joi.string()
        .required() ,
        freeSpace : Joi.string()
        .required() ,
        weight : Joi.number()
        .required() 

    }
    )
    
    return Joi.validate(data,schema) ; 
    
    
}

  
module.exports.registerValidation = registerValidation  ;
module.exports.loginvalidation = loginValidation  ;
module.exports.ProductValidation = ProductValidation  ;
module.exports.OrderValidation = OrderValidation  ;
