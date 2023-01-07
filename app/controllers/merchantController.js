 let bcrypt = require('bcrypt')
 let models = require('../../models/index')
 let validator = require('validatorjs')

 async function getMerchant(req,res){
    try {   
        let result = await models.Merchants.findAll({
            attributes: ['id', 'name', 'email'],
            include: {
                association: 'products',
                attributes: ['id', 'name','quantity','price']
            }
        })
        if(result.length < 1){
            res.json({message:"Data Not Available"})
        }
            res.json(result)
    }catch(error){
        res.json(error)
        console.log(error)
    }
 }
 async function getMerchantById(req,res){
    try {
        let result = await models.Merchants.findOne({where: {id: req.params.id}})
        if (result.length < 1){
            res.json({message: "Data Not Available"})
        }
        res.json(result)
    } catch (error) {
        res.json(error)
        
    }
 }
 async function createMerchant(req,res){
    try {
      let rules = {
        name: 'required|min:3|max:50',
        email: 'required|email|min:10',
        password: 'required|min:6',
        address: 'required',
        phone_number:'required|numeric'
      }
          
      let validation = new validator(req.body, rules)
          
      if (validation.passes()) {
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password,salt)
        req.body.password = password
  
        let createMerchant = await models.Merchants.create(req.body)
        res.json({message:"Account Successfully Created"})
      } else {
        return res.json({ errors: validation.errors.all() });
      }
    } catch (error) {
      res.json(error)
      console.log(error);
    }
  }
  async function updateMerchant(req,res){
    try {
        let result = await models.Merchants.findOne({where:{id: req.params.id}})
        if(result.length < 1){
        res.json({message: "Data Not Available"})
    }

    let updateMerchant = await result.update(req.body)
    res.json(result)
    } catch (error) {
        res.json(error)
        console.log(error);
    }
}
async function deleteMerchant(req,res){
    try {
        let deleteMerchant = await models.Merchants.destroy({where:{id: req.params.id}})
        res.json({message:"Merchant Deleted", id: req.params.id})
    } catch (error) {
        res.json(error);
        console.log(error)
    }
}
 module.exports = {
    getMerchant,getMerchantById,createMerchant,updateMerchant,deleteMerchant
 }