const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req,res = response, next) => {

    const token= req.header('x-token');
    if(!token) return res.status(401).json({msg: 'auth denied'})

    try{
        const{uid, name} = jwt.verify(token, process.env.JWT_SEED)
        req.uid= uid;
        req.name= name;
    }catch(error){
        console.log(error)
        return res.status(401).json({msg: 'Token not valid'})
    }

    next();
}


module.exports= {
     validateJWT
}