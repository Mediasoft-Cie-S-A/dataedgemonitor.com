const express = require('express');
const MonitoringConfig = require('./MonitoringConfigModel');
const router = express.Router();


// Add a new monitoring config
router.post('/', async (req, res) => {
  try {
    const monitoringConfig = await MonitoringConfig.create(req.body);
    res.status(201).json(monitoringConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all monitoring configs
router.get('/', async (req, res) => {
  try {
    const monitoringConfigs = await MonitoringConfig.find();
    res.json(monitoringConfigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a monitoring config by ID
router.get('/:id', async (req, res) => {
  try {
    const monitoringConfig = await MonitoringConfig.findById(req.params.id);
    res.json(monitoringConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a monitoring config
router.put('/:id', async (req, res) => {
  try {
    const monitoringConfig = await MonitoringConfig.findByIdAndUpdate
    (req.params.id, req.body , { new: true });
    res.json(monitoringConfig);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}
);

// Delete a monitoring config
router.delete('/:id', async (req, res) => {
  try {
    await MonitoringConfig.findByIdAndDelete(req.params.id);
    res.json({ message: 'Monitoring config deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
