const mongoose=require('mongoose')

const prodctSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:Object,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

Product=mongoose.model('Product',prodctSchema,'product')

module.exports=Product