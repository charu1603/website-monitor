const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  url: { type: String, required: true },
  status: { type: String, default: 'Unknown' },
  lastChecked: { type: Date, default: Date.now },
  responseTime: { type: Number, default: 0 },
});

module.exports = mongoose.model('Website', websiteSchema);
