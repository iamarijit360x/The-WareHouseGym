const {userAuthticated,isAdmin}=require('../controllers/Authmiddleware')
const express=require('express')
const router=express.Router()
const {getUsers}=require('../controllers/adminController')
router.get('/admin',userAuthticated,isAdmin,getUsers)

module.exports = router;
