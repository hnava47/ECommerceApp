const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
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

`;

module.exports = typeDefs;
//// ask why we need auth and checkout
// ask about cart 