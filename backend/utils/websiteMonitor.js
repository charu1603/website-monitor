const axios = require('axios');
const Website = require('../models/Website');

const monitorWebsites = async () => {
  const websites = await Website.find();

  websites.forEach(async (website) => {
    try {
      const start = Date.now();
      await axios.get(website.url);
      const responseTime = Date.now() - start;

      website.status = 'Up';
      website.responseTime = responseTime;
      website.lastChecked = Date.now();
    } catch (error) {
      website.status = 'Down';
      website.lastChecked = Date.now();
    }

    await website.save();
  });
};

module.exports = monitorWebsites;
