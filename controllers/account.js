const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

async function getUserByUsername(req, res, next) {
	let user = await User.findOne({ username: req.body.username });

	req.userByUsername = user;
	next();
}

async function getUserByEmail(req, res, next) {
	let user = await User.findOne({ email: req.body.username });

	req.userByEmail = user;

	if (!req.userByEmail && !req.userByUsername)
		return res.status(400).send({
			message: "Pengguna dengan email ini tidak ditemukan",
			messageType: "error",
		});

	next();
}
async function checkUserByUsername(req, res, next) {
	let user = await User.findOne({ username: req.body.username });
	if (user)
		return res.status(400).send({
			message: "Username sudah pernah didaftarkan",
			messageType: "error",
		});

	req.user = user;
	next();
}

async function checkUserByEmail(req, res, next) {
	let user = await User.findOne({ email: req.body.username });
	if (user)
		return res.status(400).send({
			message: "Email sudah pernah didaftarkan",
			messageType: "error",
		});

	req.user = user;
	next();
}

async function getUserById(req, res, next) {
	let user = await User.findById(req.decode._id);
	if (!user)
		return res.status(400).send({
			message: "Pengguna tidak ditemukan",
			messageType: "error",
		});

	req.user = user;
	next();
}

async function createUser(req, res, next) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const newUser = new User({
		firstName: req?.body?.firstName,
		lastName: req?.body?.lastName,
		username: req?.body?.username,
		email: req?.body?.email,
		type: req?.body?.type,
		password: hashedPassword,
	});

	const user = await newUser.save();

	res
		.header(
			"x-auth-token",
			jwt.sign({ _id: user._id }, process.env.jwtPrivateKey)
		)
		.send({
			..._.pick(user, ["fullName", "username", "email"]),
			bearerToken: jwt.sign({ _id: user._id }, process.env.jwtPrivateKey),
			message: "Berhasil mendaftar",
			messageType: "success",
		});
}

async function compareBcrypt(req, res, next) {
	const isValid = await bcrypt.compare(req?.body?.password, req?.userByEmail?.password || req?.userByUsername?.password);
	if (!isValid)
		return res.status(400).send({
			message: "Username atau password anda tidak valid",
			messageType: "error",
		});

	next();
}

async function sendResultLogin(req, res, next) {
	res
		.header(
			"x-auth-token",
			jwt.sign({ _id: req?.userByEmail?._id || req?.userByUsername?._id }, process.env.jwtPrivateKey)
		)
		.send({
			..._.pick(req?.userByEmail || req?.userByUsername, ["fullName", "username", "_id", "type", "email"]),
			bearerToken: jwt.sign({ _id: req?.userByEmail?._id || req?.userByUsername?._id }, process.env.jwtPrivateKey),
			message: "Berhasil masuk",
			messageType: "success",
		});
}

exports.getUserByUsername = getUserByUsername;
exports.getUserByEmail = getUserByEmail;
exports.checkUserByUsername = checkUserByUsername;
exports.checkUserByEmail = checkUserByEmail;
exports.getUserById = getUserById;
exports.compareBcrypt = compareBcrypt;
exports.createUser = createUser;
exports.sendResultLogin = sendResultLogin;
