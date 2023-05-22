const jwt = require("jsonwebtoken");

async function isUser(req, res, next) {}

async function isAdmin(req, res, next) {
	if (req.user.type !== "admin")
		return res
			.status(403)
			.send({ message: "This endpoint is used by admin only" });
  next()
}

exports.isUser = isUser;
exports.isAdmin = isAdmin;
