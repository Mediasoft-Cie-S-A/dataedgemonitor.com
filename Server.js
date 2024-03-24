const express = require('express');
const app = express();
app.set('view engine', 'ejs');
require('dotenv').config();
require('./Db'); // Initialize database connection

app.use(express.json()); // Body parser middleware

// Define routes here, for example:
app.use('/api/auth', require('./models/Auth'));
app.use('/api/servicetypes', require('./models/ServiceType'));
app.use('/api/subscriptions', require('./models/SubscriptionService'));
app.use('/api/purchases', require('./models/PurchaseService'));
app.use('/api/monitoringConfigs', require('./models/MonitoringConfigService'));

app.get('/login', (req, res) => {
  res.render('login', { errorMessage: req.query.error }); // Optional: Pass error messages to the template
});

app.get('/register', (req, res) => {
  res.render('register', { errorMessage: req.query.error }); // Optional: Pass error messages to the template
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/subscriptions', (req, res) => {
  res.render('subscriptions');
});


// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
