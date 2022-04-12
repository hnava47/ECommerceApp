const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],

    username: {
        type: String,
        required: true
    },

    productName: {
        type: String,
    },


});

const Order = model('Order', orderSchema);

module.exports = Order;
