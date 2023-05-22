const Joi = require("joi");

function validateRegister(req, res, next) {
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
			}),
		email: Joi.string()
			.min(1)
			.email()
			.required()
			.error((errors) => {
				errors.forEach((err) => {
					switch (err.code) {
						case "any.required":
							err.message = "Email dibutuhkan!";
							break;
						case "string.empty":
							err.message = "Email tidak boleh kosong!";
							break;
						case "string.email":
							err.message = "Email tidak valid!";
							break;
						case "string.min":
							err.message = `Email setidaknya memiliki panjang ${err.local.limit} karakter!`;
							break;
						default:
							break;
					}
				});
				return errors;
			}),
		type: Joi.string().valid("admin", "user").required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.required":
            err.message = "Tipe dibutuhkan!";
            break;
          case "any.only":
            err.message = `Tipe harus bernilai admin atau user!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
		password: Joi.string().min(8).max(1024).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.required":
            err.message = "Password dibutuhkan!";
            break;
          case "string.empty":
            err.message = "Password tidak boleh kosong!";
            break;
          case "string.min":
            err.message = `Password setidaknya memiliki panjang ${err.local.limit} karakter!`;
            break;
          case "string.max":
            err.message = `Password tidak boleh melebihi ${err.local.limit} karakter!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
	});
	const { error } = schema.validate(req.body);

	if (error)
		return res.status(400).send({
			code: 400,
			message: error.message,
			messageType: "warning"
		});

	next();
}

function validateLogin(req, res, next) {
	const schema = Joi.object({
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
			}),
		password: Joi.string().min(8).max(1024).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.required":
            err.message = "Password dibutuhkan!";
            break;
          case "string.empty":
            err.message = "Password tidak boleh kosong!";
            break;
          case "string.min":
            err.message = `Password setidaknya memiliki panjang ${err.local.limit} karakter!`;
            break;
          case "string.max":
            err.message = `Password tidak boleh melebihi ${err.local.limit} karakter!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
	});
	const { error } = schema.validate(req.body);

	if (error)
		return res.status(400).send({
			code: 400,
			message: error.message,
			messageType: "warning"
		});

	next();
}

exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
