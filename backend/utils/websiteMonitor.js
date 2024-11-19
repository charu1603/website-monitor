const puppeteer = require('puppeteer');
const Website = require('./models/website');

const monitorWebsites = async () => {
  const websites = await Website.find(); // Fetch all websites from the database

  for (const website of websites) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const startTime = Date.now();

      // Navigate to the website
      await page.goto(website.url, { waitUntil: 'load', timeout: 60000 });

      // Measure response time
      const responseTime = Date.now() - startTime;

      // Gather performance metrics
      const performanceTiming = await page.evaluate(() => JSON.stringify(window.performance.timing));
      const { loadEventEnd, navigationStart } = JSON.parse(performanceTiming);
      const pageLoadTime = loadEventEnd - navigationStart;

      // Close the browser
      await browser.close();

      // Update the database with performance data
      website.status = 'Up';
      website.responseTime = responseTime;
      website.pageLoadTime = pageLoadTime;
      website.lastChecked = new Date();
      await website.save();
    } catch (error) {
      console.error(`Error monitoring ${website.url}:`, error);

      // Mark the website as down in case of failure
      website.status = 'Down';
      website.lastChecked = new Date();
      await website.save();
    }
  }
};

module.exports = monitorWebsites;
