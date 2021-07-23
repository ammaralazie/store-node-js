const db=require('../database/db')
const Product=require('../model/Product')

const groupProduct=[
    new Product({
        title:'product 1',
        discription:{
            information:'fjkbnfd kbre kbe bkeebkj bkerghrhr bkrb rekb elrh kr blrb re hllb r;b erl,m ner;lb ker ble'
        },
        price:222,
        image:'dskbnfln'
    }),
    new Product({
        title:'product 2',
        discription:{
            information:'fjkbnfd kbre kbe bkeebkj bkerghrhr bkrb rekb elrh kr blrb re hllb r;b erl,m ner;lb ker ble'
        },
        price:222,
        image:'dskbnfln'
    }),
    new Product({
        title:'product 3',
        discription:{
            information:'fjkbnfd kbre kbe bkeebkj bkerghrhr bkrb rekb elrh kr blrb re hllb r;b erl,m ner;lb ker ble'
        },
        price:222,
        image:'dskbnfln'
    }),
    new Product({
        title:'product 4',
        discription:{
            information:'fjkbnfd kbre kbe bkeebkj bkerghrhr bkrb rekb elrh kr blrb re hllb r;b erl,m ner;lb ker ble'
        },
        price:222,
        image:'dskbnfln'
    })
]
groupProduct.forEach((obj)=>{
    obj.save((err,product)=>{
        if(err){
            console.log(err)
        }else{
            console.log(product.title+' was added successfly')
        }
    })
})
