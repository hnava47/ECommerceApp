const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    orderQuantity: {
        type: Number,
        min: 0,
        default: 0
    },
    username: {
        type: String,
        required: true
    },
    productName: {
        type: String,

    }
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
