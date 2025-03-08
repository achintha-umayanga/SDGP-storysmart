
import express from 'express';
import dotenv from "dotenv";
import {connectDB} from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async(req,res) => {
    const product = req.body;


    if(!product.name || !product.price || !product.image ){
        return res.status(400).json({ success:false,message:"please provide all fields"});
    }

    const newProduct = new product(product)

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log('server started hello');
});


//pass iwhSppc1uaoZH9hM`