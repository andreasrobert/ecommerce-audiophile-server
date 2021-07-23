import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    helloSomething: String!
    cats: [Cat!]!
    products: [Product!]!
    productsbyCategory(category: String, new: Boolean): [Product]
    productsbyId(_id: ID, slug: String, new: Boolean): [Product]

  }

  type Cat {
    id: ID!
    name: String!
  }

  type ProductImage{
    mobile: String
    tablet: String
    desktop: String
    tabletCat: String
  }

  type Includes{
    item: String
    quantity: Int
  }

  type Galleries{
      first: ProductImage
      second: ProductImage
      third: ProductImage
  }

  type Others{
    slug: String
    name: String
    image: ProductImage
  }

  type Product{
    _id: ID
    id: String
    slug: String
    name: String
    cart: String
    image: ProductImage
    category: String
    new: Boolean
    price: Int
    description: String
    features: String
    includes: [Includes]
    gallery: Galleries
    others: [Others]
  }

  type Mutation {
    createCat(name: String!): Cat!
  }
`;