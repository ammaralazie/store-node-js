const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/Store',{ useNewUrlParser: true,useUnifiedTopology: true  },(err)=>{
    if(!err){
        console.log('database work successfly')
    }else{
        console.log(err)
    }
})