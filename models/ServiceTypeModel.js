const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  price: { type: Number, required: true },
  interval: { type: String, required: true } // e.g., "monthly", "annually"
}, { timestamps: true });

const ServiceType = mongoose.model('ServiceType', serviceTypeSchema);

module.exports = ServiceType;
