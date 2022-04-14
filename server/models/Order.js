const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        
    },
    orderQuantity: {
        type: Number,
        min: 0,
        default: 1,
        required: true
    },
    username: {
        type: String,
        required: true
    }


});

const Order = model('Order', orderSchema);

module.exports = Order;
