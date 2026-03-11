const express = require('express');
const path = require('path');
const db = require('../DatabaseConnection');
const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const fs = require('fs');

require('dotenv').config();

// Get acrylic images
router.get('/acrylic', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

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

        res.render('acrylic', { lucrari, user: req.session.user });
    });
});

// Get portraits images
router.get('/portraits', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

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

        res.render('portraits', { lucrari, user: req.session.user });
    });

});

// Get watercolor images
router.get('/watercolor', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

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

        res.render('Watercolor', { lucrari, user: req.session.user });
    });
});

// Get random draw images
router.get('/random_draw', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

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

        res.render('Random draw', { lucrari, user: req.session.user });
    });
});

// Get draw images (dreses)
router.get('/dress', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

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

        res.render('Dress', { lucrari, user: req.session.user });
    });
});


module.exports = router;