const joi = require('@hapi/joi')

const joiSch = joi.object({
    name: joi.string(),
    email: joi.string().lowercase(),
    password:joi.string(),
    title: joi.string(),
    des: joi.string(),
    age: joi.number(),
    image:joi.string()
})

module.exports={joiSch}