const router = require('express').Router();
const signup = require('./signup');
const signin = require('./signin');


router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router;
