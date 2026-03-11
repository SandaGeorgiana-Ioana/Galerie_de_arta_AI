// middleware.js
const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        let errors = {};

        if (!req.body.user_name || req.body.user_name.length < 3) {
            errors.unError = 'Username must be at least 3 characters long';
        }

        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            errors.passError = 'Password must be at least 6 characters long';
        }

        // If there are any errors, render the registration page with the error messages
        if (Object.keys(errors).length > 0) {
            return res.render('register', {
                unError: errors.unError,
                passError: errors.passError,
                passMatchError: errors.passMatchError
            });
        }

        // If all validations pass, continue to the next middleware
        next();
    },


    isAuthenticated: (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            console.log('Token not found');
            return res.redirect('/login');
        }

        try {
            const decoded = jwt.verify(token, 'SECRETKEY');
            console.log('Decoded JWT:', decoded);
            req.user = decoded;  // Adaugă utilizatorul decodat
            next();
        } catch (err) {
            console.log('Token invalid sau expirat:', err.message);
            res.clearCookie('token');
            return res.redirect('/login');
        }
    }
};
