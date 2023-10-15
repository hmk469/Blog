const mongoose = require('mongoose')

const MONGO_URL="mongodb+srv://hmk469:XI09wtjdvyk3ICyz@cluster0.pxbm6ct.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async ()=>{
    const connection = await mongoose.connect(MONGO_URL)
    if(connection) console.log("Database connected")
    else console.log("Database connection failed")
}

module.exports ={connectDB}