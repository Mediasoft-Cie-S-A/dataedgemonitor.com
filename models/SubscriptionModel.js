const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true }, // e.g., "active", "cancelled", "expired"
  paymentDetails: {
    lastPaymentDate: Date,
    amount: Number,
    method: String // e.g., "credit_card", "paypal"
  }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
