const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    pool: config.database.pool,
    logging: config.database.logging
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user.model')(sequelize, Sequelize);
db.Agent = require('./agent.model')(sequelize, Sequelize);
db.Pickup = require('./pickup.model')(sequelize, Sequelize);
db.WasteType = require('./wasteType.model')(sequelize, Sequelize);
db.Payment = require('./payment.model')(sequelize, Sequelize);
db.Godown = require('./godown.model')(sequelize, Sequelize);
db.Address = require('./address.model')(sequelize, Sequelize);
db.Rating = require('./rating.model')(sequelize, Sequelize);
db.Wallet = require('./wallet.model')(sequelize, Sequelize);

// Define associations
// User associations
db.User.hasMany(db.Pickup, { foreignKey: 'userId', as: 'pickups' });
db.User.hasMany(db.Address, { foreignKey: 'userId', as: 'addresses' });
db.User.hasOne(db.Wallet, { foreignKey: 'userId', as: 'wallet' });
db.User.hasMany(db.Rating, { foreignKey: 'userId', as: 'ratingsGiven' });

// Agent associations
db.Agent.hasMany(db.Pickup, { foreignKey: 'agentId', as: 'pickups' });
db.Agent.belongsTo(db.Godown, { foreignKey: 'assignedGodownId', as: 'assignedGodown' });
db.Agent.hasOne(db.Wallet, { foreignKey: 'agentId', as: 'wallet' });
db.Agent.hasMany(db.Rating, { foreignKey: 'agentId', as: 'ratings' });

// Pickup associations
db.Pickup.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
db.Pickup.belongsTo(db.Agent, { foreignKey: 'agentId', as: 'agent' });
db.Pickup.belongsTo(db.WasteType, { foreignKey: 'wasteTypeId', as: 'wasteType' });
db.Pickup.belongsTo(db.Address, { foreignKey: 'addressId', as: 'address' });
db.Pickup.hasOne(db.Payment, { foreignKey: 'pickupId', as: 'payment' });
db.Pickup.hasOne(db.Rating, { foreignKey: 'pickupId', as: 'rating' });

// Payment associations
db.Payment.belongsTo(db.Pickup, { foreignKey: 'pickupId', as: 'pickup' });
db.Payment.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
db.Payment.belongsTo(db.Agent, { foreignKey: 'agentId', as: 'agent' });

// Godown associations
db.Godown.hasMany(db.Agent, { foreignKey: 'assignedGodownId', as: 'agents' });

// Address associations
db.Address.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
db.Address.hasMany(db.Pickup, { foreignKey: 'addressId', as: 'pickups' });

// Rating associations
db.Rating.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
db.Rating.belongsTo(db.Agent, { foreignKey: 'agentId', as: 'agent' });
db.Rating.belongsTo(db.Pickup, { foreignKey: 'pickupId', as: 'pickup' });

// Wallet associations
db.Wallet.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
db.Wallet.belongsTo(db.Agent, { foreignKey: 'agentId', as: 'agent' });

module.exports = db;
