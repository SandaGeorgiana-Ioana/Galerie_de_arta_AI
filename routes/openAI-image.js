const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/generate-variation', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;

        const form = new FormData();
        form.append('image', fs.createReadStream(imagePath));
        form.append('n', 1);
        form.append('size', '1024x1024');

        const response = await axios.post('https://api.openai.com/v1/images/variations', form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        fs.unlinkSync(imagePath);

        const imageUrl = response.data.data[0].url;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Eroare la generarea imaginii:', error.response?.data || error.message);
        res.status(500).json({ error: 'Eroare la generarea variației imaginii.' });
    }
});

module.exports = router;
