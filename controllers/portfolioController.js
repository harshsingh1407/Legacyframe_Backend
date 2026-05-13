const Portfolio = require('../models/Portfolio');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
const getPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find().sort({ createdAt: -1 });
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a portfolio item
// @route   POST /api/portfolio
// @access  Public (Should be private in production)
const addPortfolio = async (req, res) => {
    try {
        console.log('Adding portfolio item...');
        console.log('Body:', req.body);
        console.log('File:', req.file);

        const { title, category, description, spanClass } = req.body;
        
        let imageUrl = req.body.imageUrl;
        let cloudinaryId = '';

        if (req.file) {
            imageUrl = req.file.path;
            cloudinaryId = req.file.filename; 
        }

        if (!imageUrl) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const newPortfolio = new Portfolio({
            title,
            imageUrl,
            cloudinaryId,
            category,
            description,
            spanClass
        });
        const savedPortfolio = await newPortfolio.save();
        console.log('Portfolio saved:', savedPortfolio);
        res.status(201).json(savedPortfolio);
    } catch (error) {
        console.error('Error in addPortfolio:', error);
        res.status(400).json({ message: error.message || 'Error saving portfolio' });
    }
};

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Public (Should be private in production)
const updatePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        const { title, category, description, spanClass } = req.body;
        
        let imageUrl = portfolio.imageUrl;
        let cloudinaryId = portfolio.cloudinaryId;

        // If a new file is uploaded, replace the old one
        if (req.file) {
            // Delete old image from Cloudinary
            if (portfolio.cloudinaryId) {
                await cloudinary.uploader.destroy(portfolio.cloudinaryId);
            }
            imageUrl = req.file.path;
            cloudinaryId = req.file.filename;
        }

        portfolio.title = title || portfolio.title;
        portfolio.category = category || portfolio.category;
        portfolio.description = description || portfolio.description;
        portfolio.spanClass = spanClass || portfolio.spanClass;
        portfolio.imageUrl = imageUrl;
        portfolio.cloudinaryId = cloudinaryId;

        const updatedPortfolio = await portfolio.save();
        res.status(200).json(updatedPortfolio);
    } catch (error) {
        console.error('Error in updatePortfolio:', error);
        res.status(400).json({ message: error.message || 'Error updating portfolio' });
    }
};

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Public (Should be private in production)
const deletePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        // Delete image from Cloudinary if it exists
        if (portfolio.cloudinaryId) {
            await cloudinary.uploader.destroy(portfolio.cloudinaryId);
        }

        await portfolio.deleteOne();
        res.status(200).json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPortfolios,
    addPortfolio,
    deletePortfolio,
    updatePortfolio
};
