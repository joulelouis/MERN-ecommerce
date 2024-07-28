// ========== IMPORTING AND INITIALIZATION ==========
const jwt = require ("jsonwebtoken");
const secret = "XxvFABYaGn0JIHKT20zF"

// ========== FUNCTIONS ==========
// Token creation
module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		username: user.username,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign (data, secret, {});
};

// Token Verification
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (typeof token !== "undefined") {
		console.log (token);
		token = token.slice (7, token.length);

		return jwt.verify(token, secret, (err, data) => {

			if (err) {
				return res.send ({auth: "failed"});
		
			} else {
				next();
			}
		})

	} else {
		return res.send ({auth: "failed"});
	}
};

// Token decryption
module.exports.decode = (token) => {

	if (typeof token !== "undefined") {
		token = token.slice (7, token.length);
		return jwt.verify (token, secret, (err, data) => {

			if (err) {
				return null;

			} else {
				return jwt.decode (token, {complete: true}).payload
			}
		})
	}
};

// ===============================