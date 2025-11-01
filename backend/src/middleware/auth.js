const jwt=require('jsonwebtoken');


function authMiddleWare(req,res,next)
{
    const token=req.header('Authorization')?.replace('Bearer ', '');
    if(!token) return res.status(401).json({msg:'no token provided'});

    try{
       const decode = jwt.verify(token,process.env.JWT_SECRET);
       req.user=decode;
       next();
    }catch(error)
    {
        res.status(401).json({msg:'Invalid Token'});
    }
};