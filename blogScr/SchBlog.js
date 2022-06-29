const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const sch = new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }, 
    title: {
        type: String,
    }, 
    des: {
        type:String
    },
    age: {
        type: Number,
    },
    image: {
        type:String
    }
})

sch.pre('save',async function (next){
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
    next()
})
sch.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password,this.password)
    } catch (err) {
        throw(err)
    }
}
module.exports = mongoose.model('blog', sch)