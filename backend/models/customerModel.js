import mongoose from "mongoose";
const { Schema } = mongoose;

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    address: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
