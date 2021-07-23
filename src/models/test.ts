import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    { name: 'string'
    // , 
    // age: 'number' 
});

const Cat = mongoose.model('Cat', Schema);

export default Cat;