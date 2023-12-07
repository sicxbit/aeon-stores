const { Schema, model, models, default: mongoose } = require("mongoose");

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    city: String,
    pincode: String,
    state: String,
    paid: Boolean
});

export const Order = models.Order || model('Order', OrderSchema)

