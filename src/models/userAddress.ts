import mongoose from 'mongoose';

const userAddressSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    zipCode: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },
  
    country: {
        type: String,
        required: true
      }

})

const User = mongoose.model('UserAddress', userAddressSchema);
export default User;
