const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
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
    image: {
        type: String
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }
});

const Product = model('Product', productSchema);

module.exports = Product;
