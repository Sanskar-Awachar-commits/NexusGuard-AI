require('dotenv').config();
const express = require('express');

const app = express();

app.get('/health', (req, res) => {
    res.status(200).json({ status: "NexusGuard AI is Operational" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`NexusGuard API running on port ${PORT}`);
});