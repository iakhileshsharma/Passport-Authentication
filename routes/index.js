const express = require('express');
const router = express.Router();

//welcome page
router.get('/', (req, res) => {
    res.render('Welcome');
});
//Dashboard 
router.get('/dashboard', (req, res) => {
    res.render('Dashboard');
});

module.exports = router;

