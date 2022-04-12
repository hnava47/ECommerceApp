const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0.99
    },
    quantityOnHand: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',

    }
});

const Product = model('Product', productSchema);

module.exports = Product;
