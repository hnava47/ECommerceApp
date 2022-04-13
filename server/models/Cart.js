const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
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
        required: true,
        index: true
    }
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
