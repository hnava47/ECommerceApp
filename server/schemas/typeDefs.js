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
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Category {
    _id: ID
    name: String
  }

  type Cart {
     _id: ID
     products: [Product]

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
    quantityOnHand: Int,
    ):Product

    addOrder(products: [ID]!): Order

   
  
  }
  

`;

module.exports = typeDefs;
//// ask why we need auth and checkout
// ask about cart 
// : Auth