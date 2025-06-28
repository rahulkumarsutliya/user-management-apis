const Category = require('../models/categoryModel');


exports.getAllCategories = async(req,res)=>{
    try{
        const categories = await Category.find();
        res.status(200).send({message : "All Categories fetched ",categories});
    }catch(err){
        res.status(500).send({message:err.message});
    }
};



exports.addCategory = async(req,res)=>{
    try{
        const category = await Category.create({ name: req.body.name });
        res.status(201).send({message : "Category added ",category});
    }catch(err){
        res.status(500).send({message:err.message});
    }
};



exports.updateCategory = async(req,res)=>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
        if(!category){
            return res.status(404).send({message : "Category not found"});
        }
        res.status(200).send({message:"Category updated", category});
    }catch(err){
        res.status(500).send({message:err.message});
    }
};


exports.deleteCategory = async(req,res)=>{
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category){
            return res.status(404).send({message : "Category not found"});
        }
        res.status(200).send({message: "Category deleted"});
    }catch(err){
        res.status(500).send({message:err.message});
    }
};


