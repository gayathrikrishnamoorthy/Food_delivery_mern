import express from 'express'
import { loginuser,regsisteruser } from '../controllers/usertcontroller.js'

const userrouter = express.Router()

userrouter.post('/register',regsisteruser)
userrouter.post('/login',loginuser)

export default userrouter;