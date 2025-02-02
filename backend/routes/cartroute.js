import express from 'express'
import { addtocart,removecart,getcart } from '../controllers/cart.js'
import authmiddleware from '../middleware/auth.js';
const cartrouter= express.Router();

cartrouter.post('/add',authmiddleware,addtocart)
cartrouter.post('/remove',authmiddleware, removecart)
cartrouter.post('/get',authmiddleware, getcart)

export default cartrouter;