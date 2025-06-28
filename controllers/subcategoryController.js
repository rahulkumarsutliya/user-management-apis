const Subcategory = require('../models/subcategoryModel');

exports.addSubcategory = async(req,res)=>{
    try{
        const{name}=  req.body;
        const{categoryId} = req.body;

        const subcategory = await Subcategory.create({name:name, category:categoryId});
        res.status(201).send({message:"Subcategory created",subcategory});
    }catch(err){
        res.status(500).send({message:err.message});
    }
};


exports.updateSubcategory = async(req,res)=>{
    try{
        const subcategory = await Subcategory.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
        if(!subcategory){
            return res.status(404).send({message: "Subcategory not found"});
        }
        res.status(200).send({message:"Subcategory updated",subcategory});
    }catch(err){
        res.status(500).send({message:err.message});
    }
};



exports.deleteSubcategory = async(req,resp)=>{
    try{
        const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if(!subcategory){
            return resp.status(404).send({message: "Subcategory not found"});
        }
        resp.status(200).send({message:"Subcategory deleted"});
    }catch(err){
        resp.status(500).send({message:err.message});
    }
};