import {app} from './app.js';
import {connectDB} from './config/database.js';
import Razorpay from 'razorpay';

connectDB();

export const instance = new Razorpay({
    key_id : process.env.RAZOR_API_KEY,
    key_secret : process.env.RAZOR_API_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log(`Listening at port ${process.env.PORT}`);
})