const express = require('express');
const db = require('../DatabaseConnection');

const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching users');
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { email, password, first_name, last_name, user_name } = req.body;
    db.query(
        'INSERT INTO user (email, password, first_name, last_name, user_name) VALUES (?,?,?,?,?)',
        [email, password, first_name, last_name, user_name],
        (err) => {
            if (err) {
                return res.status(400).send('Error creating user');
            }
            res.status(201).send('User created successfully');
        }
    );
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { email, password, first_name, last_name, user_name } = req.body;
    db.query(
        'UPDATE user SET email = ?, password = ?, first_name = ?, last_name = ?, user_name = ? WHERE id_user = ?',
        [email, password, first_name, last_name, user_name, id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.stack });
            }
            res.status(200).json({ message: 'User updated successfully' });
        }
    );
});

module.exports = router;
