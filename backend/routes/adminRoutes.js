const express=require('express')
const router=express.Router()
const {getUsers, sendReminderMail}=require('../controllers/adminController');
const { userAuthticated,isAdmin } = require('../middlewares/Authmiddleware');
router.get('/admin',userAuthticated,isAdmin,getUsers)
router.put('/send-reminder',userAuthticated,isAdmin,sendReminderMail)
module.exports = router;
