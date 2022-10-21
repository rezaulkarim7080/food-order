const express = require("express");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const { result } = require("lodash");

const router = express.Router();

const newUser = async (req, res) => {
  const { error } = validate(req.body); /// joi packge check validate
  if (error) return res.status(400).send(error.details[0].message); /// joi packge check validate

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send(" User already registered!");

  /// normal way

  //   user = new User({
  //     email: req.body.email,
  //     password: req.body.password,
  //   });

  ///  Using Lodash
  user = new User(_.pick(req.body, ["email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateJWT();
  const result = await user.save();
  return res.status(201).send({
    token: token,
    user: _.pick(result, ["_id", "email"]),
  });
};

//// authoroxation

const authUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email  Or Password");

  const validateUser = await bcrypt.compare(req.body.password, user.password);
  if (!validateUser) return res.status(400).send("Invalid password");

  const token = user.generateJWT();
  res.send({
    token: token,
    user: _.pick(user, ["id", "email"]),
  });
};

router.route("/").post(newUser);
router.route("/auth").post(authUser);

module.exports = router;
