const Blog = require('../blogScr/SchBlog')
const IMG=require('../helper/hlpSCH')
const httError = require('http-errors')
const { joiSch } = require('../blogScr/validation')
const{signAccessToken,verifyToken}=require('../Token/token')
exports.PostRegister=async (req, res,next) => {
    try {
        const data = await joiSch.validateAsync(req.body);
        const doseExit = await Blog.findOne({ email: data.email })
        if(doseExit) throw httError.Conflict(`${data.email} is already registered`)
        const result = await Blog(data)
        const saveBlog = await result.save()
        const assessToken = await  signAccessToken(saveBlog.id,saveBlog.name)
        res.send({assessToken})
        
    } catch (err) {
        next(err)
    }
}
exports.PostLogin = async (req, res, next) => {
    try {
        const data = await joiSch.validateAsync(req.body);
        const user = await Blog.findOne({ email: data.email })
        if (!user) throw httError.NotFound('this account not register')
        const isMatch = await user.isValidPassword(data.password)
        if (!isMatch) throw httError.Unauthorized('user/password is not match')
        const assessToken = await  signAccessToken(user.id,user.name)
        res.send({assessToken})
    } catch (err) {
        next(err)
    }
}
exports.Getting = async (req, res, next) => {
    try {
        const user = req.blog.userId        // console.log(user)
        const data = await Blog.find({ _id:user})
        // console.log(data)
         res.send(data)
    } catch(err) {
        next(err)
    }
}
exports.Uploader = async (req, res, next) => {
    try {
        const imageFile = req.files.file[0].filename;
        // console.log(imageFile)
        const imagesFiled = req.files.copy[0].filename;
        // console.log(imagesFiled)
        const imageDetails =new IMG({image: imageFile, images: imagesFiled} );
        // console.log(imageDetails)
        const img = await imageDetails.save()
        // console.log(img)
        res.json({ message: 'success',imag:img })   
            
    } catch (err) {
        next(err)
    }
}