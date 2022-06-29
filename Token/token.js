const JWT = require('jsonwebtoken')
const httError = require('http-errors')

module.exports = {
    signAccessToken: (userId,userName) => {
        return new Promise((resolve, reject)=>{     
            const payload = {userId,userName }
            // console.log(payload)
            const secret =process.env.ACCESS_SECRET_TOKEN
            const options = {
                expiresIn: "1y",
                issuer: "google.com",
                audience: userId
            }
            JWT.sign(payload , secret, options, (err, token) => {
                if (err) {
                    reject(httError.InternalServerError())
                    console.log(err)
                }
                resolve(token)
              })
          })
    },
    verifyToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(httError.Unauthorized())
        const header = req.headers['authorization']
        const headerToken = header.split(' ')
        const token = headerToken[1]
        JWT.verify(token, process.env.ACCESS_SECRET_TOKEN,  (err, payload)=> {
            if (err) {
             return  next(httError.InternalServerError())
            }
            req.blog = payload
            // console.log(req.blog=payload)
            next()
          });
    }
   
}