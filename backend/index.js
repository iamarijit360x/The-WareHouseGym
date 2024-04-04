const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.json({name:"Project X",status:"Acti"})
})
app.listen(3000)