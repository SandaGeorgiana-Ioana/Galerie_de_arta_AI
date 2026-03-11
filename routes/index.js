const express = require('express');
const path = require('path');
const db = require('../DatabaseConnection');
const { isAuthenticated } = require('./middleware');
const imageRoutes = require('./image');

const router = express.Router();

router.get('/', (req, res) => {
    const error = req.query.error || null;
    res.render('welcome', { error });
});

router.get('/login', (req, res) => {
    const error = req.query.error || null;
    res.render('login', { error });
});

router.get('/about', isAuthenticated, (req, res) => {
    console.log(req.user);
    if (!req.user) {
        return res.redirect('/login');
    }
    res.render('about', { user: req.user.user_name, session: req.session });
});

router.get('/acrylic', isAuthenticated, (req, res) => {
    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'acrylic'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('acrylic', {
            title: 'Picturi Acrilice',
            lucrari,
            user: req.user.user_name,
            session: req.session
        });
    });
});

router.get('/watercolor', isAuthenticated, (req, res) => {
    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'watercolor';\n", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('watercolor', {
            title: 'Watercolor',
            lucrari,
            user: req.user.user_name,
            session: req.session
        });
    });
});

router.get('/portraits', isAuthenticated, (req, res) => {
    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'portraits'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('portraits', {
            title: 'Pencil portraits',
            lucrari,
            user: req.user.user_name,
            session: req.session
        });
    });
});

router.get('/ai_art', isAuthenticated, (req, res) => {
    res.render('ai_art', { title: 'AI art', user: req.user.user_name,session: req.session});
});


router.get('/art', isAuthenticated, (req, res) => {
    res.render('art', { title: 'Arta', user: req.user.user_name, session: req.session});
});

router.get('/artists', isAuthenticated, (req, res) => {
    res.render('artists', { title: 'Artist', user: req.user.user_name, session: req.session });
});

router.get('/bia', isAuthenticated, (req, res) => {
    const artistInfo = {
        name: 'Bianca Husu',
        bio: 'I am a student at the "Faculty of Electrical Engineering and Computer Science," specializing in "Computer Science." I chose this eld for the creativity allowed in programming, but I have also started to discover the beauty of electronics. I have good communication skills, I am an energetic and creative person who enjoys trying new things. I am passsionate I am passionate about drawing in many forms, I like trying new techniques and combining colors.',
        profileImage: '/images/artist/bia.jpg'
    };

    res.render('bia', {
        title: 'About Bianca Husu',
        artist: artistInfo,
        user: req.user.user_name,
        session: req.session
    });
});

router.get('/dress', isAuthenticated, (req, res) => {
    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'dress'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('dress', {
            title: 'Dress',
            lucrari,
            user: req.user.user_name,
            session: req.session
        });
    });
});


router.get('/georgi', isAuthenticated, (req, res) => {
    const artistInfo = {
        name: 'Georgiana Sanda',
        bio: 'I am a student at Transilvania University Faculty of Electrical Engineering and Computer Science, Department of Computers. I quickly adapt to new situations and tasks. I enjoy hiking, cycling, spending time with loved ones playing board games, exploring new places cooking, and going to the movies. In my free time, I enjoy working with technology and learning new things.',
        profileImage: '/images/artist/georgi.jpg'
    };

    res.render('georgi', {
        title: 'About Georgiana Sanda',
        artist: artistInfo,
        user: req.user.user_name,
        session: req.session
    });
});


router.get('/random_draw', isAuthenticated, (req, res) => {
    db.query("SELECT id_art, art_name, art_description AS descriere, price AS pret, art_images FROM art WHERE categorie = 'random_draw'", (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            return res.status(500).send('Eroare la interogarea bazei de date');
        }

        const lucrari = result.map(row => ({
            id_art: row.id_art,
            art_name: row.art_name,
            descriere: row.descriere || '',
            pret: row.pret,
            imagini: row.art_images ? row.art_images.split(',').map(s => s.trim()) : []
        }));

        res.render('random_draw', {
            title: 'Random draw',
            lucrari,
            user: req.user.user_name,
            session: req.session
        });
    });
});

router.get('/reacts', isAuthenticated, (req, res) => {
    res.render('reacts', { title: 'Reacts', user: req.user.user_name,  session: req.session});
});


router.get('/marian', isAuthenticated, (req, res) => {
        const artistInfo = {
            name: 'Marian Girbacea',
            bio: '.....',
            profileImage: '/images/artist/marian.jpg'
        };

        res.render('marian', {
            title: 'About Marian Girbacea',
            artist: artistInfo,
            user: req.user.user_name,
            session: req.session
        });
});

router.get('/cart', isAuthenticated, (req, res) => {
    const success = req.query.success || null;
    res.render('cart', {
        title: 'Cart',
        user: req.user.user_name,
        success:success,
        session: req.session
    });

});
module.exports = router;