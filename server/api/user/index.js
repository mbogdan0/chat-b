const router = require('express').Router();
const signup = require('./signup');



router.post('/signup', signup);



module.exports = router;
