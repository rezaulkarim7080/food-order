const joi = require("joi");
// joi packge testing
const schema = joi.object({
  email: joi.string().min(5).max(225).required().email(),
  password: joi.string().min(5).max(1024).required(),
});

const user = {
  email: "et@gmail.com",
  password: "123456",
};

const { error } = schema.validate(user);
console.log(error.details[0], message);
