import mongooose from 'mongoose'

 export const connectDB = async()=>
{
    await mongooose.connect('mongodb://localhost:27017/food-del').then (()=>console.log("DB connected"))
}

