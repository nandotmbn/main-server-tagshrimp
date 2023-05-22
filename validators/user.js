const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function updateUserPayloadValidators(req, res, next) {
	const schema = Joi.object({
		firstName: Joi.string()
			.min(3)
			.max(64)
			.required()
			.error((errors) => {
				errors.forEach((err) => {
					switch (err.code) {
						case "any.required":
							err.message = "Nama depan dibutuhkan!";
							break;
						case "string.empty":
							err.message = "Nama depan tidak boleh kosong!";
							break;
						case "string.min":
							err.message = `Nama depan setidaknya memiliki panjang ${err.local.limit} karakter!`;
							break;
						case "string.max":
							err.message = `Nama depan tidak boleh melebihi ${err.local.limit} karakter!`;
							break;
						default:
							break;
					}
				});
				return errors;
			}),
		lastName: Joi.string()
			.min(3)
			.max(64)
			.required()
			.error((errors) => {
				errors.forEach((err) => {
					switch (err.code) {
						case "any.required":
							err.message = "Nama belakang dibutuhkan!";
							break;
						case "string.empty":
							err.message = "Nama belakang tidak boleh kosong!";
							break;
						case "string.min":
							err.message = `Nama belakang setidaknya memiliki panjang ${err.local.limit} karakter!`;
							break;
						case "string.max":
							err.message = `Nama belakang tidak boleh melebihi ${err.local.limit} karakter!`;
							break;
						default:
							break;
					}
				});
				return errors;
			}),
		username: Joi.string()
			.min(3)
			.max(64)
			.required()
			.error((errors) => {
				errors.forEach((err) => {
					switch (err.code) {
						case "any.required":
							err.message = "Username dibutuhkan!";
							break;
						case "string.empty":
							err.message = "Username tidak boleh kosong!";
							break;
						case "string.min":
							err.message = `Username setidaknya memiliki panjang ${err.local.limit} karakter!`;
							break;
						case "string.max":
							err.message = `Username tidak boleh melebihi ${err.local.limit} karakter!`;
							break;
						default:
							break;
					}
				});
				return errors;
			})
	});
	const { error } = schema.validate(req.body);

	if (error)
		return res.status(400).send({
			code: 400,
			message: error.message,
			messageType: "warning",
		});

	next();
}

function objectIdValidator(req, res, next) {
	const schema = Joi.object({
		_id: Joi.objectId()
			.required()
			.error((errors) => {
				errors.forEach((err) => {
					switch (err.code) {
						case "string.pattern.name":
							err.message = "ID yang diberikan tidak valid!";
							break;
						default:
							break;
					}
				});
				return errors;
			}),
	});
	const { error } = schema.validate({ _id: req.params.id });

	if (error)
		return res.status(400).send({
			code: 400,
			message: error.message,
			messageType: "warning",
		});

	next();
}

exports.updateUserPayloadValidators = updateUserPayloadValidators;
exports.objectIdValidator = objectIdValidator;
