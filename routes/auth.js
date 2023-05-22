const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../validators/auth");
const {
	createUser,
	getUserByUsername,
	checkUserByEmail,
	checkUserByUsername,
	compareBcrypt,
	sendResultLogin,
	getUserByEmail,
} = require("../controllers/account");

router.post("/login", [
	validateLogin,
	getUserByUsername,
	getUserByEmail,
	compareBcrypt,
	sendResultLogin,
]);

router.post("/register", [
	validateRegister,
	checkUserByEmail,
	checkUserByUsername,
	createUser,
]);

module.exports = router;
