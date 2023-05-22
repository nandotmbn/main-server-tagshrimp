const jwt = require("jsonwebtoken");

async function decoder(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
	const decode = jwt.verify(token, process.env.jwtPrivateKey);
  req.decode = decode
  next()
}

exports.decoder = decoder 