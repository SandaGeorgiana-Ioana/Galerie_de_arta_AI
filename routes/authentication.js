// routes/router.js

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const db = require('../DatabaseConnection');
const users = require('./middleware');
const {validateRegister} = require("./middleware");

// routes/router.js

router.post('/register', validateRegister, (req, res, next) => {
    db.query(
        'SELECT id_user FROM user WHERE LOWER(user_name) = LOWER(?)',
        [req.body.username],
        (err, result) => {
            if (result && result.length) {
                const error = 'This username is already in use!';
                return res.render('register', { error });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            message: err,
                        });
                    } else {
                        db.query(
                            'INSERT INTO user ( user_name, password, email, first_name, last_name, registered) VALUES ( ?, ?, ?, ?, ?, now());',
                            [ req.body.user_name, hash, req.body.email, req.body.first_name, req.body.last_name],
                            (err, result) => {
                                if (err) {
                                    console.error('Database insertion error:', err);
                                    const error = "Eroare la inserarea în baza de date!";
                                    return res.redirect('/login?error=' + encodeURIComponent(error));
                                }
                                return res.redirect('/login');
                            }
                        );
                    }
                });
            }
        }
    );
});
// routes/router.js
router.post('/login', (req, res) => {
    db.query(
        `SELECT * FROM user WHERE user_name = ?;`,
        [req.body.username],
        (err, result) => {
            if (err) return res.status(500).send("Eroare server.");

            if (!result.length) {
                return res.render('login', { error: "Userul nu există." });
            }

            bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
                if (bErr) return res.status(500).send("Eroare la verificarea parolei.");

                if (bResult) {
                    const token = jwt.sign(
                        {
                            user_name: result[0].user_name,
                            userId: result[0].id,
                        },
                        'SECRETKEY',
                        { expiresIn: '7d' }
                    );

                    // Setează token-ul în cookie
                    res.cookie('token', token, { httpOnly: true });

                    db.query(`UPDATE user SET last_login = now() WHERE id_user = ?;`, [result[0].id]);

                    return res.redirect('/about');
                } else {
                    return res.render('login', { error: "Parolă incorectă." });
                }
            });
        }
    );
});


router.get('/login', (req, res) => {
    const error = req.query.error || null;
    res.render('login', { error });
});

router.get('/register', (req, res) => {
    res.render('register', {
        error: req.query.error || null,
        unError: null,
        passError: null,
        passMatchError: null
    });
});


router.get('/secret-route', (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;