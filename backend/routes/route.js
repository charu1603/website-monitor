const express = require('express');
const axios = require('axios');
const Website = require('../models/Website');
const router = express.Router();

// Add a website
router.post('/add', async (req, res) => {
  const { url } = req.body;
  try {
    const newWebsite = new Website({ url });
    await newWebsite.save();
    res.status(201).json(newWebsite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all websites
router.get('/', async (req, res) => {
  try {
    const websites = await Website.find();
    res.json(websites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check status of websites (cron job)
router.get('/check-status', async (req, res) => {
  try {
    const websites = await Website.find();
    for (const website of websites) {
      try {
        await axios.get(website.url);
        website.status = 'up';
      } catch {
        website.status = 'down';
      }
      website.lastChecked = Date.now();
      await website.save();
    }
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

