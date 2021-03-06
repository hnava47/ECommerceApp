const { AuthorizationError } = require('apollo-server-express');
const { User, Product, Category, Order, Cart } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {

        users: async () => {
            return await User.find({})
        },

        user: async (_root, { id }) => {
            return await User.findById(id);
        },

        products: async () => {
            return await Product.find().populate('categoryId');
        },

        orders: async (_root, _args, context) => {
            const username = context.user.username;
            return await Order.find({ username }).populate('productId');
        },

        categories: async () => {
            return await Category.find({}).sort('name');
        },
        category: async (_root, { id }) => {
            return await Category.findById(id);
        },

        cartCheckout: async (parent, _args, context) => {
            let totalPrice = 0;
            const username = context.user.username;
            const cart = await Cart.find({ username }).populate('productId');
            cart.forEach((value) => {
                totalPrice += value.orderPrice;
            })
            return {totalPrice, cart};
        },

        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products');

            for (let i = 0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }

    },

    Mutation: {
        //sign up ;
        addUser: async (parent, { firstName, lastName, username, email, password }) => {
            const user = await User.create({ firstName, lastName, username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthorizationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthorizationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };

        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthorizationError('Not logged in');
        },

        addProduct: async (_root, { name, description, unitPrice, quantityOnHand, }) => {
            return await Product.create({
                name,
                description,
                unitPrice,
                quantityOnHand,

            })
        },
        addOrder: async (parent, { name, productID, username }, context) => {

            console.log(name);
            return await Order.create({ name, productID, username })

        },

        addCart: async (parent, { productId }, context) => {
            const username = context.user.username;
            return await Cart.create({ productId, username })
        },
        updateCart: async(parent, { id, orderQuantity }, context) => {
            return await Cart.findByIdAndUpdate(
                id,
                { orderQuantity },
                { new: true }
            );
        },
        removeCart: async(parent, { id }, context) => {
            return await Cart.findByIdAndDelete(id);
        }
    }
}



module.exports = resolvers;
