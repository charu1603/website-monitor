const Website = require('../models/Website');

// Get all websites
const getWebsites = async (req, res) => {
  try {
    const websites = await Website.find();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new website
const addWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    const website = new Website({ url });
    await website.save();
    res.status(201).json(website);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWebsites, addWebsite };
