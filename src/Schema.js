import mongoose from "mongoose";
import bcrypt from "bcrypt";

const cusschema = mongoose.Schema(
  {
    Email: {
      type: String,
    },
    Name: {
      type: String,
    },
    Cart: {
      type: Array,
    },
    Allproducts: {
      type: Array,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

cusschema.pre("save", async function () {
  if (this.isModified("password")) {      
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});


cusschema.methods.matchPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

const customerSchema = mongoose.model("customers", cusschema);

export default customerSchema;
