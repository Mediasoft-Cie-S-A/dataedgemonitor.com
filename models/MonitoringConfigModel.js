const mongoose = require('mongoose');

const monitoringConfigSchema = new mongoose.Schema({
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  databaseType: { type: String, required: true },
  connectionDetails: {
    host: String,
    port: Number,
    databaseName: String,
    username: String,
    
  },
  monitoringParameters: {
    interval: Number, // Monitoring interval in minutes
    metrics: [String], // List of metrics to monitor
  },
  healthCheckConfig: {
    Locks: {
        enabled: Boolean,
        threshold: Number,
        },
    Transactions: {
        enabled: Boolean,
        threshold: Number,
        },
    Connections: {
        enabled: Boolean,
        threshold: Number,
        },
    Memory: {
        enabled: Boolean,
        threshold: Number,
        },
    CPU: {
        enabled: Boolean,
        threshold: Number,
        },
    Disk: {
        enabled: Boolean,
        threshold: Number,
        },
    Replication: {
        enabled: Boolean,
        threshold: Number,
        },
    Performance: {
        enabled: Boolean,
        threshold: Number,
        },
    Security: {
        enabled: Boolean,
        threshold: Number,
        },
    Backup: {
        enabled: Boolean,
        threshold: Number,
        },  
  alertsConfig: {
    enabled: Boolean,
    thresholds: {
        responseTime: Number,
        Locks: Number,
        Transactions: Number,
        Connections: Number,
        Memory: Number,
        CPU: Number,
        Disk: Number,   
        Performance: Number,
        Security: Number,
        Backup: Number,
        Replication: Number,
        },
    lastcheck: Date,
    contactEmail: String,


    },
    contactEmail: String,
  }
}, { timestamps: true });

const MonitoringConfig = mongoose.model('MonitoringConfig', monitoringConfigSchema);

module.exports = MonitoringConfig;
