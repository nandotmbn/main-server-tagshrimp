const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		minlength: 1,
		maxlength: 255,
		trim: true,
		required: true,
	},
	lastName: {
		type: String,
		minlength: 1,
		maxlength: 255,
		trim: true,
		required: true,
	},
	username: {
		type: String,
		minlength: 0,
		maxlength: 64,
		trim: true,
		default: "",
	},
	email: {
		type: String,
		minlength: 0,
		maxlength: 64,
		trim: true,
		default: "",
	},
	password: {
		type: String,
		default: "",
	},
	type: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
});

const User = mongoose.model("User", UserSchema);

exports.User = User;
