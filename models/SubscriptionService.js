const Subscription = require('./SubscriptionModel');
const router = express.Router();

// Add a new subscription
router.post('/', async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a subscription by ID
router.get('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a subscription
router.put('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate
    (req.params.id, req.body , { new: true });
    res.json(subscription);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}
);

// Delete a subscription
router.delete('/:id', async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscription deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
// Path: models/SubscriptionService.js
