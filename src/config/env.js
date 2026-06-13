require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    gemini: process.env.GEMINI_API_KEY,
    github: {
        secret: process.env.GITHUB_WEBHOOK_SECRET,
        token: process.env.GITHUB_PAT
    }
};