const config = require('./src/config/env');
const express = require('express');

const githubRoutes = require('./src/routes/github.routes');

const app = express();

app.get('/health', (req, res) => {
    res.status(200).json({ status: "NexusGuard AI is Operational" });
});

app.post('/api/github', githubRoutes);

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`NexusGuard API running on port ${PORT}`);
});