const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

var userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    password:{
        type:String,
        required:true,
    }
})//end of UserSchema
userSchema.methods.hashPassword=(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}//end of hashPassword

userSchema.methods.comparePassword=(password,hash)=>{
    return bcrypt.compareSync(password,hash)
}//end of comparePassword


User=mongoose.model('User',userSchema,'users')

module.exports=User