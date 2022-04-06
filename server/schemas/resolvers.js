const { AuthorizationError } = require('apollo-server-express');
const { User, Product, Category, Order, Cart } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

/// ask if the ids have to match the ids in typedefs 
const resolvers = {
    Query: {

        user: async () => {
            return await User.find({})
        },

        user: async (_root, { id }) => {
            return await User.findById(id);
        },

        products: async () => {
            return await Product.find({});
        },

        product: async (_root, id) => {
            return await Product.findById(id);
        },

        orders: async () => {
            return await Order.find({})
        },

        order: async (_root, { id }) => {
            return await Order.findById(id);
        },

        categories: async () => {
            return await Category.find({});
        },
        category: async (_root, { id }) => {
            return await Category.findById(id);
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
        addUser: async (parent, args) => {
            const user = await User.create(args);
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
        addOrder: async (parent, { products }, context) => {
            console.log({ product: products });
            return await Order.create({ products })

        },


    }
}



module.exports = resolvers;