// authentication.js
const express = require('express');
const router = express.Router();
const db = require('../DatabaseConnection');
const session = require("express-session");
const body_parser = require('body-parser');
const {isAuthenticated} = require("./middleware");

router.use(body_parser.urlencoded({ extended : false }));
router.use(body_parser.json());

router.use(session({
    secret : '1234567890abcdefghijklmnopqrstuvwxyz',
    resave : false,
    saveUninitialized : true,
    cookie : { secure : false }
}));


router.get('/cart/:id', isAuthenticated, async (req, res) => {
    const art_id = req.params.id;

    try {
        db.query('SELECT * FROM art WHERE id_art = ?', [art_id], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Eroare la afișarea produsului.');
            }

            if (rows.length === 0) {
                return res.status(404).send('Produsul nu a fost găsit.');
            }

            const art = rows[0];
            res.render('cart', {
                art,
                user: req.session.user?.username});

            console.log("Art object:", art);
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Eroare la afișarea produsului.');
    }

});


router.post("/cart", isAuthenticated, async (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    }

    const user_id = req.session.user.id;
    const { art_name, first_name, last_name, judet, oras, str, tele } = req.body;

    try {
        db.query('SELECT id_art FROM art WHERE art_name = ? LIMIT 1', [art_name], (err, rows) => {
            if (err) {
                console.error('Eroare la interogarea art:', err);
                return res.status(500).json({ message: 'Eroare la interogarea operei de artă' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Art not found' });
            }

            const id_art = rows[0].id_art;

            db.query(
                'INSERT INTO comanda (id_user, id_art, first_name, last_name, judet, oras, strada, tele) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [user_id, id_art, first_name, last_name, judet, oras, str, tele],
                (insertErr, result) => {
                    if (insertErr) {
                        console.error('Eroare la inserarea comenzii:', insertErr);
                        return res.status(500).json({ message: 'Eroare la plasarea comenzii' });
                    }
                    return res.redirect('/cart?success=1');
                }
            );
        });
    } catch (err) {
        console.error('Eroare internă:', err);
        res.status(500).send('Eroare la procesarea cererii');
    }
});



module.exports = router;