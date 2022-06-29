const express = require('express')

const router = express.Router()
const routers=require('./routers')

router.use('/blog',routers)






module.exports=router