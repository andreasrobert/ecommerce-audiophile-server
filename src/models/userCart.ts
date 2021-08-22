import mongoose from "mongoose";

const userCartSchema = new mongoose.Schema({
  userId: String,
  order: {},
});

const UserCart = mongoose.model("UserCart", userCartSchema);
export default UserCart;
