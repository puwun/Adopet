const Joi = require('joi');
const ExpressError = require('../utils/ExpressError');



const validateUser = (req,res,next)=>{ 
    const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
    // .min(8) 
    .required(),
    email: Joi.string().required(),
    phone: Joi.string()
    // .pattern(new RegExp('/^[0-9]{10}$/'))
    .required()
    .messages({'string.pattern.base': 'Invalid phone number. Please provide a 10-digit number.',}),
}).required()
    const {error} = userSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        // console.log(error);
        // console.log('----------------------');
        // console.log(msg);
        throw new ExpressError(msg, 400);
    }else{
        next();
    }


}
