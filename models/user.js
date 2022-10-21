const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 225,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.methods.generateJWT = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET_KEY, { expiresIn: "13h" });
  return token;
};

/// joi packge

const validateUser = (user) => {
  const schema = joi.object({
    email: joi.string().min(5).max(225).required().email(),
    password: joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
};

module.exports.User = model("User", userSchema);
module.exports.validate = validateUser;
