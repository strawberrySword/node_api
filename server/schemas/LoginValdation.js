import Joi from '@hapi/joi'

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    password: Joi.string().min(6).required()
})

export default schema