var express = require('express');
const { registerUser, loginUser, getUserInfo, editUserInfo, makeAdmin } = require('../Controllers/UserController');
var router = express.Router();
const authenticate = require('../middlewares/authenticate');
const checkAdmin = require('../middlewares/checkAdmin');





/* Register user */
router.post('/register', registerUser);


/* Login user */
router.post('/login', loginUser);

/* get user Info */
router.get('/me', authenticate, getUserInfo);


/* update user Info */
router.put('/me', authenticate, editUserInfo);



/* make user admin */
router.put('/:userId', authenticate, checkAdmin, makeAdmin);




module.exports = router;
