const express = require('express');
const router = express.Router();
const {expiryCheck}=require('../controllers/expiryChecker')
const { userAuthticated } = require('../middlewares/Authmiddleware');
const {buyMembership}=require('../controllers/purchaseMembership')

router.get('/profile',userAuthticated,expiryCheck,(req,res)=>{
    res.json(req.user)
})

router.post('/buy',userAuthticated,buyMembership)
module.exports = router;
