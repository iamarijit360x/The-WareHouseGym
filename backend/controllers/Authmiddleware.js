exports.userAuthticated=function (req,res,next)
{
    if(req.isAuthenticated())
        next()
    else
        res.status(401).json({message:"Not Authnticated",authStatus:false})  
}