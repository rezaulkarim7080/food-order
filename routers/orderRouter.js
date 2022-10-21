const express = require("express");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const { Order } = require("../models/order");
const _ = require("lodash");
const { result } = require("lodash");
const router = express.Router();

router.route("/").get().post();

module.exports = router;
