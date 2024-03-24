const express = require('express');
const app = express();

require('dotenv').config();
require('./db'); // Initialize database connection

app.use(express.json()); // Body parser middleware

// Define routes here, for example:
app.use('/api/auth', require('./models/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
