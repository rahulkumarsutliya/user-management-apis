const Address = require('../models/addressModel');

//add new address
exports.addAddress = async(req,resp)=>{
    try{
        if(req.body.isDefault){
            await Address.updateMany({user : req.user.id},{isDefault : false});
        }

        const address = new Address({...req.body, user:req.user.id});
        await address.save();
        resp.status(201).send(address);
    }catch(err){
        resp.status(500).send({message:err.message || "Server Error"});
    }
};

//fetch existing address
exports.getAddress = async(req,resp)=>{
    try{
        const addresses = await Address.find({user:req.user.id}).populate('user','name');
        resp.status(200).send(addresses);
    }catch(err){
        resp.status(500).send({message:err.message || "Server Error"});
    }
};


//update address
exports.updateAddress = async(req,resp)=>{
    try{
        if(req.body.isDefault){
            await Address.updateMany({user:req.user.id},{isDefault:false});
        }

        const address = await Address.findOneAndUpdate({user:req.user.id},req.body,{new:true});
        if(!address){
            return resp.status(404).send({message:"Address not found"});
        }
        resp.status(200).send(address);
    }catch(err){
        resp.status(500).send({message:err.message || "Server Error"});
    }
};


//set default address
exports.setDefaultAddress = async(req,resp)=>{
    try{
        await Address.updateMany({user:req.user.id},{isDefault:false});
    
        const address = await Address.findOneAndUpdate({user:req.user.id},req.body,{new:true});

        if(!address){
            return resp.status(404).send({message: "Address Not Found"});
        }

        resp.status(200).send(address);
    
    }catch(err){
        resp.status(500).send({message:err.messgae || "Server Error"});
    }
};

