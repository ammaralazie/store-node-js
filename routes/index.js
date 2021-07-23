var express = require('express');
var router = express.Router();
const Product =require('../model/Product')
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  Product.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      context={
        obj:data
      }//end of context
      res.render('index',context);
    }
  })
 
});

module.exports = router;
