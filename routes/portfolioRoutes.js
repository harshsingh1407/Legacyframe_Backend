const express = require('express');
const router = express.Router();
const { getPortfolios, addPortfolio, deletePortfolio, updatePortfolio } = require('../controllers/portfolioController');
const { upload } = require('../config/cloudinary');

router.get('/', getPortfolios);
router.post('/', upload.single('image'), addPortfolio);
router.put('/:id', upload.single('image'), updatePortfolio);
router.delete('/:id', deletePortfolio);

module.exports = router;
