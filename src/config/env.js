require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    gemini: process.env.GEMINI_API_KEY
};