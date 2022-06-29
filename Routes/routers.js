const express = require('express')
const { PostRegister, PostLogin, Getting,Uploader } = require('../controller/blogController')
const{verifyToken}=require('../Token/token')
const router = express.Router();

const {upload}=require('../helper/hlpUpload')


router.post('/upload',upload,Uploader)
router.post('/register',PostRegister )
router.post('/login',PostLogin )
router.get('/get',verifyToken,Getting )


module.exports=router