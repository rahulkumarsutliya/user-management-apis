const jwt = require('jsonwebtoken');

const protect = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    try{
        if(!authHeader){
            return res.status(401).send({message : "Authorization header is missing"});
        }

        if(!authHeader.startsWith('Bearer')){
            return res.status(401).send({message: "Invalid authorization format. Expected Bearer token"});
        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).send({message: "Token is missing"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).send({message:err.message || "Invalid token"});
    }
};

module.exports = protect;

