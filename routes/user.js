const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/account");
const { decoder } = require("../controllers/decoder");
const { isAdmin } = require("../controllers/authorization");
const {
	getUserByGivenID,
	accountUpdater,
	deleteUser,
} = require("../controllers/user");
const {
	objectIdValidator,
	updateUserPayloadValidators,
} = require("../validators/user");

router.get("/", [
	decoder,
	getUserById,
	async (req, res) => {
		res.send(req.user);
	},
]);

router.get("/:id", [
	objectIdValidator,
	decoder,
	getUserById,
	isAdmin,
	getUserByGivenID,
	async (req, res) => {
		res.send(req.user);
	},
]);

router.put("/:id", [
	objectIdValidator,
	updateUserPayloadValidators,
	decoder,
	getUserByGivenID,
	accountUpdater,
	async (req, res) => {
		const result = await req.user.save();
		return res.send(result);
	},
]);

router.delete("/:id", [
	objectIdValidator,
	decoder,
	getUserById,
	isAdmin,
	deleteUser,
	async (req, res) => {
		return res.send(req.user);
	},
]);

module.exports = router;
