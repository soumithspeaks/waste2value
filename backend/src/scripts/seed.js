require('dotenv').config();
const db = require('../models');
const logger = require('../utils/logger');

// Waste types seed data
const wasteTypes = [
  {
    name: 'Organic Waste',
    category: 'organic',
    subCategory: 'General',
    description: 'Biodegradable waste including food scraps and garden waste',
    pricePerKg: 2.00,
    icon: 'leaf',
    color: '#4CAF50',
    isActive: true,
    recyclingInstructions: 'Separate from non-organic waste. Keep dry and clean.',
    environmentalImpact: {
      carbonSavedPerKg: 0.5,
      waterSavedLiters: 10
    }
  },
  {
    name: 'PET Plastic',
    category: 'plastic',
    subCategory: 'PET',
    description: 'Polyethylene Terephthalate - commonly used in bottles',
    pricePerKg: 5.00,
    icon: 'bottle-soda',
    color: '#2196F3',
    isActive: true,
    recyclingInstructions: 'Remove caps and labels. Rinse clean. Crush to save space.',
    environmentalImpact: {
      carbonSavedPerKg: 1.5,
      waterSavedLiters: 30
    }
  },
  {
    name: 'HDPE Plastic',
    category: 'plastic',
    subCategory: 'HDPE',
    description: 'High-Density Polyethylene - milk jugs, detergent bottles',
    pricePerKg: 4.50,
    icon: 'bottle-tonic',
    color: '#03A9F4',
    isActive: true,
    recyclingInstructions: 'Clean and dry before recycling.',
    environmentalImpact: {
      carbonSavedPerKg: 1.4,
      waterSavedLiters: 28
    }
  },
  {
    name: 'Paper & Cardboard',
    category: 'paper',
    subCategory: 'General',
    description: 'Newspapers, magazines, cardboard boxes',
    pricePerKg: 3.00,
    icon: 'newspaper',
    color: '#795548',
    isActive: true,
    recyclingInstructions: 'Keep dry. Remove plastic tapes and staples.',
    environmentalImpact: {
      carbonSavedPerKg: 0.9,
      waterSavedLiters: 24
    }
  },
  {
    name: 'Aluminum Cans',
    category: 'metal',
    subCategory: 'Aluminum',
    description: 'Beverage cans and aluminum containers',
    pricePerKg: 10.00,
    icon: 'glass-mug-variant',
    color: '#9E9E9E',
    isActive: true,
    recyclingInstructions: 'Rinse clean. Crush to save space.',
    environmentalImpact: {
      carbonSavedPerKg: 9.0,
      waterSavedLiters: 40
    }
  },
  {
    name: 'Steel Containers',
    category: 'metal',
    subCategory: 'Steel',
    description: 'Food cans and steel containers',
    pricePerKg: 8.00,
    icon: 'candelabra',
    color: '#607D8B',
    isActive: true,
    recyclingInstructions: 'Remove labels. Rinse clean.',
    environmentalImpact: {
      carbonSavedPerKg: 1.5,
      waterSavedLiters: 35
    }
  },
  {
    name: 'Glass Bottles',
    category: 'glass',
    subCategory: 'General',
    description: 'Glass bottles and jars',
    pricePerKg: 4.00,
    icon: 'bottle-wine',
    color: '#009688',
    isActive: true,
    recyclingInstructions: 'Remove caps and lids. Separate by color if possible.',
    environmentalImpact: {
      carbonSavedPerKg: 0.3,
      waterSavedLiters: 20
    }
  },
  {
    name: 'E-waste',
    category: 'ewaste',
    subCategory: 'Electronics',
    description: 'Electronic devices, batteries, circuit boards',
    pricePerKg: 15.00,
    icon: 'cellphone',
    color: '#FF9800',
    isActive: true,
    recyclingInstructions: 'Handle with care. Do not dismantle. Keep dry.',
    environmentalImpact: {
      carbonSavedPerKg: 2.0,
      waterSavedLiters: 50
    }
  },
  {
    name: 'Hazardous Waste',
    category: 'hazardous',
    subCategory: 'General',
    description: 'Medical waste, chemicals, batteries',
    pricePerKg: 1.00,
    icon: 'biohazard',
    color: '#F44336',
    isActive: true,
    recyclingInstructions: 'Special handling required. Contact for instructions.',
    environmentalImpact: {
      carbonSavedPerKg: 0.1,
      waterSavedLiters: 5
    }
  }
];

// Godowns seed data
const godowns = [
  {
    name: 'Central Recycling Hub',
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716] // Bangalore coordinates
    },
    address: '123 MG Road, Bangalore, Karnataka 560001',
    capacity: 50000,
    currentLoad: 0,
    operatingHours: {
      monday: { open: '08:00', close: '20:00' },
      tuesday: { open: '08:00', close: '20:00' },
      wednesday: { open: '08:00', close: '20:00' },
      thursday: { open: '08:00', close: '20:00' },
      friday: { open: '08:00', close: '20:00' },
      saturday: { open: '08:00', close: '18:00' },
      sunday: { open: '09:00', close: '17:00' }
    },
    isActive: true,
    contactPerson: 'Rajesh Kumar',
    contactPhone: '+91-9876543210',
    wasteTypesAccepted: ['organic', 'plastic', 'paper', 'metal', 'glass']
  },
  {
    name: 'East Zone Collection Center',
    location: {
      type: 'Point',
      coordinates: [77.6408, 12.9698]
    },
    address: '456 Whitefield Main Road, Bangalore, Karnataka 560066',
    capacity: 30000,
    currentLoad: 0,
    operatingHours: {
      monday: { open: '09:00', close: '19:00' },
      tuesday: { open: '09:00', close: '19:00' },
      wednesday: { open: '09:00', close: '19:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '19:00' },
      saturday: { open: '09:00', close: '17:00' },
      sunday: { open: 'closed', close: 'closed' }
    },
    isActive: true,
    contactPerson: 'Priya Sharma',
    contactPhone: '+91-9876543211',
    wasteTypesAccepted: ['plastic', 'paper', 'metal', 'glass', 'ewaste']
  }
];

async function seed() {
  try {
    logger.info('Starting database seeding...');

    // Connect to database
    await db.sequelize.authenticate();
    logger.info('Database connection established');

    // Sync database (create tables if they don\'t exist)
    await db.sequelize.sync({ alter: true });
    logger.info('Database synchronized');

    // Seed waste types
    logger.info('Seeding waste types...');
    for (const wasteType of wasteTypes) {
      await db.WasteType.findOrCreate({
        where: { name: wasteType.name },
        defaults: wasteType
      });
    }
    logger.info(`Seeded ${wasteTypes.length} waste types`);

    // Seed godowns
    logger.info('Seeding godowns...');
    for (const godown of godowns) {
      await db.Godown.findOrCreate({
        where: { name: godown.name },
        defaults: godown
      });
    }
    logger.info(`Seeded ${godowns.length} godowns`);

    logger.info('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed if called directly
if (require.main === module) {
  seed();
}

module.exports = seed;
