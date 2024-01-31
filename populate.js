require('dotenv').config();
const express = require("express")
const app = express();
const port = 5000;

const connectDB = require('./DB/connect');
const Product = require('./Models/product');
const jsonProduct = require('./product.json')

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProduct)
        app.listen(port, console.log(`server listen at port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}

start();
