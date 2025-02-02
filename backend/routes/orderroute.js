import express from 'express'

import authmiddleware from '../middleware/auth.js'
import { listorder, placeorder, updatests, userorders, verifyorder } from '../controllers/order.js'

const orderrouter = express.Router();

orderrouter.post('/place',authmiddleware,placeorder);
orderrouter.post('/verify',verifyorder);
orderrouter.post('/userorders',authmiddleware,userorders);
orderrouter.get('/list',listorder);
orderrouter.post('/status',updatests);

export default orderrouter;