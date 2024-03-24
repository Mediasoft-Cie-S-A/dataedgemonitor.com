const ServiceType = require('./ServiceTypeModel');
const router = express.Router();

// Add a new service type
router.post('/', async (req, res) => {
  try {
    const serviceType = await ServiceType.create(req.body);
    res.status(201).json(serviceType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all service types
router.get('/', async (req, res) => {
  try {
    const serviceTypes = await ServiceType.find();
    res.json(serviceTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a service type by ID
router.get('/:id', async (req, res) => {
  try {
    const serviceType = await ServiceType.findById(req.params.id);
    res.json(serviceType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a service type
router.put('/:id', async (req, res) => {
  try {
    const serviceType = await ServiceType.findByIdAndUpdate(req.params.id, req.body , { new: true });
    res.json(serviceType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a service type
router.delete('/:id', async (req, res) => {
  try {
    await ServiceType.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service type deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
