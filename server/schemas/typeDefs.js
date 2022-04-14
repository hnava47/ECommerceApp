const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    orders: [Order]
  }

  type Product {
    _id: ID
    name: String
    description: String
    quantityOnHand: Int
    unitPrice: Float
    image: String
    categoryId: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    productId: Product
    orderQuantity: Int
    username: String
  }

  type Category {
    _id: ID
    name: String
  }

  type Cart {
     _id: ID
     productId: Product
     orderQuantity: Int
     username: String
     orderPrice: Float
  }

  type mutationCart {
    _id: ID
    productId: ID
    orderQuantity: Int
    username: String
    orderPrice: Float
  }

  type Checkout {
    session: ID
  }

  type cartCheckout {
    cart: [Cart]
    totalPrice: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID): Order
    products: [Product]
    orders: [Order]
    categories: [Category]
    category(_id: ID!): Category
    checkout(products: [ID]!): Checkout
    cartCheckout: cartCheckout
  }

  type Mutation {
    addUser(
      firstName: String!,
      lastName: String!,
      username: String!,
      email: String!,
      password: String!): Auth

    login(
      email: String!,
      password: String!): Auth

    updateUser(
      firstName: String,
      lastName: String,
      email: String,
      password: String): User

    addProduct(
      name: String,
      description: String,
      unitPrice: Float,
      quantityOnHand: Int):Product

    addOrder(name: String, productID:ID,username: String,):Product

    addCart(productId: ID!): mutationCart

    updateCart(
      id: ID!
      orderQuantity: Int!): mutationCart

    removeCart(
      id: ID!): mutationCart
  }
`;

module.exports = typeDefs;
