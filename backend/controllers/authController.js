const passport=require("passport")
 exports.login=passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureMessage:'Invalid Credentials'

    })

exports.logout=(req,res)=>{
    req.logout();
    res.redirect('/')
}