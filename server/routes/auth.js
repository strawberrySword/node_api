import {Router} from 'express'
const router = Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import userSchema from '../schemas/User.js'

router.post('/register', async (req,res) =>{

    const {error} = userSchema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    

    // check if user in db
    const userExist = await User.findOne({name: req.body.name})
    if(userExist) return res.status(400).send('user exists')

    // hash psw
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send({user: user._id})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req,res) =>{
    const {error} = userSchema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // check if user exists
    const user = await User.findOne({name: req.body.name})
    if(!user) return res.status(400).send('user not exists')

    //Password is correct?
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid Password')

    //lets do le token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

export default router