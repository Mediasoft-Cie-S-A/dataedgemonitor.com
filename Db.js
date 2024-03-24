const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb://0.0.0.0:27017/dataedgemonitor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));
