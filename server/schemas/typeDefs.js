const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    orders: [Order]
    carts: [Cart]
  }

  type Product {
    _id: ID
    productName: String
    description: String
    quantityOnHand: Int
    unitPrice: Float
    category: Category
    user:[User]!
  }



  type Order {
    _id: ID
    productName: String
    username: String
    purchaseDate: String
    products: [Product]
    user:[User]
    cart: [Cart]
  }

  type Category {
    _id: ID
    name: String
  }

  type Cart {
     _id: ID
     username:String
     productID:String
     productName:String
     orderQuantity:Int
     products: [Product]
     orders:[Order]
     

  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID): Order
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    orders: [Order]
    order(_id: ID!): Order
    categories: [Category]
    category(_id: ID!): Category
    checkout(products: [ID]!): Checkout
    carts:[Cart]
    cart(_id:ID!): Cart
   
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
      productName: String,
    description: String,
    unitPrice: Float,
    quantityOnHand: Int,
    ):Product

    addOrder(products: [ID]):Order

    addCart (orders:[ID]):Cart 

    updateProduct(_id: ID!, quantity: Int!): Product

    updateCart(orders:ID,):Cart
  }
  

`;

module.exports = typeDefs;
//// ask why we need auth and checkout
// ask about cart 
// : Auth
// addOrder(productName:String, productId:String,username:String,):Order
