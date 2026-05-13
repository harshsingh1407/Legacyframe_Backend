require('dotenv').config();
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');

const seedData = [
    {
        title: "Ethereal Landscapes",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        category: "Nature",
        spanClass: "col-span-1 sm:col-span-2 sm:row-span-2"
    },
    {
        title: "Urban Architecture",
        imageUrl: "https://images.unsplash.com/photo-1449156003053-c30670b96835?auto=format&fit=crop&w=800&q=80",
        category: "Architecture",
        spanClass: "col-span-1"
    },
    {
        title: "Portrait of Soul",
        imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
        category: "Portrait",
        spanClass: "col-span-1"
    },
    {
        title: "Street Stories",
        imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
        category: "Street",
        spanClass: "col-span-1 sm:col-span-2 sm:row-span-1"
    },
    {
        title: "Fashion Editorial",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
        category: "Fashion",
        spanClass: "col-span-1 sm:row-span-2"
    },
    {
        title: "Abstract Minimalism",
        imageUrl: "https://images.unsplash.com/photo-1454117096348-e4abbeae002c?auto=format&fit=crop&w=800&q=80",
        category: "Abstract",
        spanClass: "col-span-1"
    },
    {
        title: "Product Design",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        category: "Product",
        spanClass: "col-span-1 md:col-span-2 md:row-span-2"
    },
    {
        title: "Wedding Bliss",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
        category: "Wedding",
        spanClass: "col-span-1 sm:col-span-2 sm:row-span-2 md:col-span-3 md:row-span-1 lg:col-span-1 lg:row-span-1"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");
        
        // Clear existing data
        await Portfolio.deleteMany({});
        console.log("Cleared existing portfolio data.");
        
        // Insert seed data
        await Portfolio.insertMany(seedData);
        console.log("Database Seeded Successfully!");
        
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
