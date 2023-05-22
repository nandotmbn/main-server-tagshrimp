const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = function (app, io) {
	mongoose
		.connect(process.env.DBCONN)
		.then(() => console.log("Connected to MongoDB"))
		.catch((e) => {
			throw new Error("Error : " + e);
		});
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, token"
		);
		next();
	});

	app.use("/static", express.static("static"));
	app.use("/uploads", express.static("uploads"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.set("trust proxy", true);
	app.use(
		cors({
			exposedHeaders: "x-auth-token",
		})
	);
	app.set("socketIo", io);
};
