const Purchase = require('./PurchaseModel');
const router = express.Router();

// Add a new purchase
router.post('/', async (req, res) => {
  try {
    const purchase = await Purchase.create(req.body);
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a purchase by ID
router.get('/:id', async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a purchase
router.put('/:id', async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req
        .params.id, req.body , { new: true });
    res.json(purchase);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}

);

// Delete a purchase
router.delete('/:id', async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Purchase deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
