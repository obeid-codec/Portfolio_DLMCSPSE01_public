const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../models/User'); // Adjust the path as needed

const createAdminUser = async () => {
    try {
        const email = 'administrator@example.com'; // Ensure this email is unique
        let user = await User.findOne({ email: email });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash('administrator123', salt);
            const avatar = gravatar.url(email, {
                s: '300',
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name: 'Administrator',
                email: email,
                password: password,
                isAdmin: true,
                avatar: avatar
            });

            await user.save();
            console.log('Administrator user created successfully');
        } else {
            console.log('Administrator user already exists');
        }
    } catch (error) {
        console.error('Error creating administrator user:', error);
    }
};

module.exports = createAdminUser;
