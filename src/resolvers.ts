import Product from "./models/product";

export const resolvers = {
  Query: {
    products: () => Product.find({}),
    productsbyCategory: (
      _parent: any,
      args: { category?: string; new?: boolean }
    ) => {
      return Product.find(args);
    },
    productsbyId: (
      _parent: any,
      args: { _id?: string; slug?: string; new?: boolean }
    ) => {
      return Product.find(args);
    },
  },
};
