const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const img = new mongoose.Schema({
    
    image: {
        type:String
    },
    images: {
        type:String
    }
})
module.exports = mongoose.model('img', img)