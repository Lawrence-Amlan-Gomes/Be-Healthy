import mongoose, {Schema} from "mongoose";

const schema = new Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  phone: {
    required: false,
    type: String
  },
  photo: {
    required: false,
    type: String
  },
  bio: {
    required: false,
    type: String
  },
  paymentType: {
    required: false,
    type: String
  },
  bmi: {
    required: false,
    type: Number
  },
  recipe: {
    required: false,
    type: Array,
  },
  goals: {
    required: false,
    type: Array,
  },
  nutrition: {
    required: false,
    type: Array,
  },
  meditation: {
    required: false,
    type: Array,
  },
  workout: {
    required: false,
    type: Array,
  },
  
});


export const userModel = mongoose.models.users ?? mongoose.model("users", schema);
