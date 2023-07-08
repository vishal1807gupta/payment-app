import express, { urlencoded } from "express";
import paymentRoutes from "./routes/paymentRoutes.js";
import {config} from "dotenv";
import cors from "cors";
config({path : "./config/config.env"});

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',paymentRoutes);

app.get('/api/getkey',(req,res)=>{
    res.status(200).json({
        key : process.env.RAZOR_API_KEY
    })
})