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

cusschema.pre("save", async function()  {  //runs before every save() call  not only at the first save()
  if (!this.isModified("password")) return; //prevents hashing the password again when it hasn’t changed.

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

//how this.password knows exactly copare with which doc file:///Users/sanjaykardile/Downloads/mongoose_this_explanation.pdf
cusschema.methods.matchPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};


const customerSchema=mongoose.model("customers",cusschema)


export default customerSchema;
