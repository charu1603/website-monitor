const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema({
  url: { type: String, required: true },
  status: { type: String, default: 'unknown' },
  lastChecked: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Website', WebsiteSchema);
