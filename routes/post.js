const express = require('express');
const {postValidator} = require("../validator");
const {getPosts, createPort} = require('../controllers/post');
const router = express.Router();

router.get('/', getPosts);
router.post('/post', postValidator, createPort);

module.exports = router;