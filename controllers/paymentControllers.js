import { instance } from "../server.js";
import crypto from "crypto";
import {payment} from "../models/paymentModel.js";

export const checkout = async(req,res)=>{
    const options = {
        amount : Number(req.body.amount*100),
        currency : "INR"
    }
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success : true,
        order
    })

}

export const paymentVerification = async(req,res)=>{
    
    const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256',process.env.RAZOR_API_SECRET).update(body.toString()).digest('hex');
    console.log('sig received',req.body.razorpay_signature);
    console.log('sig generated',expectedSignature);

    if(expectedSignature===req.body.razorpay_signature){

        await payment.create({
            razorpay_order_id:req.body.razorpay_order_id,
            razorpay_payment_id:req.body.razorpay_payment_id,
            razorpay_signature:req.body.razorpay_signature

        })
       
        res.redirect(`${process.env.BASE_URL}/paymentsuccess?reference=${req.body.razorpay_payment_id}`);
    }
    else{
        res.status(400).json({
            success : false
        })
    }
}