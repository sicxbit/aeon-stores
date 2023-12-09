import { Order } from "@/models/Order";
import { mongooseConnect } from "../lib/mongoose";
import { buffer } from "micro";
const stripe = require('stripe')(process.env.STRIPE_SK);


const endpointSecret = "whsec_3290102c8100024ddefa7943e34b2dabeb491fa8c3d89c923ad796603da10832";

export default async function handler(req, res) {
    await mongooseConnect()

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            console.log(data)
            const orderId = data.metadata.orderID;
            const paid = data.payment_status === 'paid'
            if (orderId && paid ) {
                await Order.findByIdAndUpdate(orderId,{
                    paid: true,
                })
            }
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('ok')

}
//account id acct_1OKosASAL6bDwXd7
export const config = {
    api: { bodyParser: false }
}