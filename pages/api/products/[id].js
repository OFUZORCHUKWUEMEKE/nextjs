import dbConnect from '../../../utils/mongo.js'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const {method,query:{id}} = req

    dbConnect()

    if(method==="GET"){
        try{
            const product = await Product.findById(id)
            res.status(200).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    }
   
    if(method==="DELETE"){
      try {
          const product = await Product.findByIdAndDelete(id)
          res.status(200).json("The Product has been Deleted!!")
      } catch (error) {
          res.status(500).json(err)
      }
    }

  }