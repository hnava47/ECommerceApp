const { AuthorizationError } = require('apollo-server-express');
const { User, Product, Category, Order, Cart } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

/// ask if the ids have to match the ids in typedefs 
const resolvers = {
    Query: {

        users: async () => {
            return await User.find({})
        },

        user: async (_root, { _id }) => {
            return await User.findById(_id);
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

        order: async (_root, { _id }) => {
            return await Order.findById(_id);
        },

        categories: async () => {
            return await Category.find({});
        },
        category: async (_root, { id }) => {
            return await Category.findById(id);
        },

        carts: async () => {
            return await Cart.find({})
        },

        cart: async (_root, { _id }) => {
            return await Cart.findById(_id);
        },

        // cart: async (_root, { _id }) => {
        //     return await Cart.findById(_id);
        // },

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


        addProduct: async (parent, { productName, description, unitPrice, quantityOnHand }, context) => {
            const product = await Product.create({ productName, description, unitPrice, quantityOnHand })
            return product;
        },

        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },

        addOrder: async (parent, { carts }, context) => {
            console.log(context.user);
            console.log(context);
            if (context.user) {
                const order = new Order({ carts });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            // throw new AuthenticationError('Not logged in');
        },

        addCart: async (parent, { products }, context) => {
            console.log(context.user);
            if (context.user) {
                const cart = new Cart({ products });

                await User.findByIdAndUpdate(context.user._id, { $push: { carts: cart } })

                return cart;
            }
            // throw new AuthorizationError('not logged in')
        },



        updateCart: async (parent, { _id }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, arg, { new: true })
            }
        },

    }
}



module.exports = resolvers;