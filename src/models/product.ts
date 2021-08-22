import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  id: String,
  slug: String,
  name: String,
  cart: String,
  image: {
    mobile: String,
    tablet: String,
    desktop: String,
    tabletCat: String,
  },
  category: String,
  new: Boolean,
  price: Number,
  description: String,
  features: String,
  includes: [
    {
      quantity: Number,
      item: String,
    },
  ],
  gallery: {
    first: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    second: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    third: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
  },
  others: [
    {
      slug: String,
      name: String,
      image: {
        mobile: String,
        tablet: String,
        desktop: String,
      },
    },
    {
      slug: String,
      name: String,
      image: {
        mobile: String,
        tablet: String,
        desktop: String,
      },
    },
    {
      slug: String,
      name: String,
      image: {
        mobile: String,
        tablet: String,
        desktop: String,
      },
    },
  ],
});

const Product = mongoose.model("Product", Schema);

export default Product;
