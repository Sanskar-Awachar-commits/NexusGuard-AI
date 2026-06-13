const express = require('express');
const router = express.Router();
const githubController = require('../controllers/github.controllers');
const verifyWebhookSignature = require('../middlewares/webhook.middleware');

router.post('/webhook', verifyWebhookSignature, githubController);

module.exports = router;