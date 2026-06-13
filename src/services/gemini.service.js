const config = require("../config/env");
const { GoogleGenAI } = require("@google/genai");
const GEMINI_API_KEY = config.gemini.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: "Why is the sky blue?",
	});
	return response.text;
}
module.exports = main;
