import Cat from "./models/test";
import Product from "./models/product";

export const resolvers = {
    Query: {
        helloSomething:()=>"Hi there 12113",
        cats: () => Cat.find(),
        products: () => Product.find({}),
        productsbyCategory: (_parent: any, args: { category?: string; new?: boolean}) =>  {
          return Product.find(args); 
          },
        productsbyId: (_parent: any, args: { _id?: string; slug?: string; new?: boolean}) =>  {
          return Product.find(args); 
          }
        },
      Mutation: {
        createCat: async (_parent:any, { name }: { name: any }) => {
          const kitty = new Cat({ name });
          await kitty.save();
          return kitty;
        },

      }
    };
