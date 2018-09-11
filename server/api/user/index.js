const router = require('express').Router();
const signup = require('./signup');
const signin = require('./signin');
const profile = require('./profile');
const authMiddlware = require('../auth.middleware');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', authMiddlware, profile);

module.exports = router;
