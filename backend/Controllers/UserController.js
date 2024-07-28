const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


/* Register user */

const registerUser = async (req, res, next) => {
    let { name, email, password } = req.body;
    try {
        // check if user exists
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        // get the avatar
        let avatar = gravatar.url(email, {
            s: '300',
            r: 'pg',
            d: 'mm'
        });
        // create the user
        user = new User({
            name,
            email,
            password,
            avatar
        });
        // Save the user to the database
        await user.save();
        return res.status(200).json({
            msg: "User Registered Successfully"
        });
    }

    catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
}

/* Login user */


const loginUser = async (req, res, next) => {
    try {
        // check if user exists
        let { email, password } = req.body;
        // check if user exists
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                msg: "Invalid Credentials"
            });
        }
        // match the password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid Password"
            });
        }

        // create a token
        const payload = {
            user: {
                id: user.id,
                name: user.name
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET_KEY, (error, token) => {
            if (error) throw error;
            res.status(200).json({
                msg: 'Login is Success',
                token: token
            });
            console.log('User Logged In Successfully');
        })


    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }

}



/* get user Info */
const getUserInfo = async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                msg: 'User not found'
            });
        }
        return res.status(200).json({
            user: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
};


/* update user Info */

const editUserInfo = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({
                msg: "User Not Found"
            });
        }
        if (name) user.name = name;
        if (email) user.email = email;

        const salt = await bcrypt.genSalt(10);
        if (password) user.password = await bcrypt.hash(password, salt);

        await user.save();
        return res.status(200).json({
            msg: "User Info Updated Successfully",
            user: user
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}

const makeAdmin = async (req, res) => {
    let { userId } = req.params;
    let { isAdmin } = req.body; // Expecting isAdmin to be a boolean value from request body

    try {
        // Check if the user is trying to toggle their own admin status
        if (req.user.id === userId) {
            return res.status(403).json({
                msg: "You cannot toggle your own admin status"
            });
        }
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                msg: "User Not Found"
            });
        }

        user.isAdmin = isAdmin; // Set the isAdmin property

        await user.save();
        return res.status(200).json({
            msg: "User Info Updated Successfully",
            user: user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}



module.exports = {

    registerUser: registerUser,
    loginUser: loginUser,
    getUserInfo: getUserInfo,
    editUserInfo: editUserInfo,
    makeAdmin: makeAdmin
}