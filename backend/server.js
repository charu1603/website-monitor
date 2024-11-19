const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const websiteRoutes = require('./routes/websiteRoutes');
dotenv.config();
const nodeSchedule = require('node-schedule');
const monitorWebsites = require('./utils/monitorWebsites');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Downtime Monitor API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use('/api/websites', websiteRoutes);
nodeSchedule.scheduleJob('*/15 * * * *', monitorWebsites);