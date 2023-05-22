const jwt = require("jsonwebtoken");
const { User } = require("../model/user");

async function getUserByGivenID(req, res, next) {
	let user = await User.findById(req.params.id);
	if (!user)
		return res.status(400).send({
			message: "Pengguna tidak ditemukan",
			messageType: "error",
		});

	req.user = user;
	next();
}

async function accountUpdater(req, res, next) {
	req.user.firstName = req?.body?.firstName || req?.user?.firstName;
	req.user.lastName = req?.body?.lastName || req?.user?.lastName;
	req.user.username = req?.body?.username || req?.user?.username;
	next();
}

async function deleteUser(req, res, next) {
	let users = await User.findByIdAndRemove(req.params.id);
	if (!users)
		return res
			.status(404)
			.send({ message: "Account with given ID is not found" });
  req.user = users
  next()
}

exports.deleteUser = deleteUser;
exports.accountUpdater = accountUpdater;
exports.getUserByGivenID = getUserByGivenID;
