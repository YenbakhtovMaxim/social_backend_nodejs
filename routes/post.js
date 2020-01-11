const express = require('express');
const { getPosts, createPort } = require('../controllers/post');
const router = express.Router();

router.get('/', getPosts);
router.post('/post', createPort);

module.exports = router;