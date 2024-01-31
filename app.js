const express = require("express")
require("express-async-errors");
const app = express();
const connectDB = require('./DB/connect')
const notFound = require('./MiddleWares/not-found')
const errorHandlerMiddleware = require('./MiddleWares/errorHandler')

app.use(express.json());
require('dotenv').config();

const products = require('./Routes/product')
app.use("/api/products",products)
app.use(errorHandlerMiddleware)
app.use(notFound)

const port = 3000

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server listen at port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}

start();