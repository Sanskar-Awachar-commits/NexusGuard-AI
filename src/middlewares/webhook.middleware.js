const config = require("../config/env");
const crypto = require("crypto");

module.exports = (req, res, next) => {
	const signature = req.headers["x-hub-signature-256"];
	const secret = config.github.secret;
	if (!secret) {
		console.error("GITHUB_WEBHOOK_SECRET is not configured.");
		return res
			.status(500)
			.json({ error: "Server configuration missing security keys." });
	}
	if (!signature) {
		return res
			.status(401)
			.json({ error: "No signature provided. Request unauthorized." });
	}
	const hmac = crypto.createHmac("sha256", secret);
	const digest = "sha256=" + hmac.update(JSON.stringify(req.rawBody)).digest("hex");
	if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
		return res.status(403).json({ error: "Invalid webhook signature." });
	}
	next();
};
