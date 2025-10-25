require('dotenv').config();
const db = require('../models');
const logger = require('../utils/logger');

async function migrate() {
  try {
    logger.info('Starting database migration...');

    // Authenticate connection
    await db.sequelize.authenticate();
    logger.info('Database connection established');

    // Run migrations (sync with alter in development, use umzug in production)
    if (process.env.NODE_ENV === 'production') {
      // In production, use migration files (umzug or sequelize-cli)
      logger.warn('Production mode: Use proper migration tools like sequelize-cli');
      logger.warn('Run: npx sequelize-cli db:migrate');
    } else {
      // Development mode: auto-sync
      await db.sequelize.sync({ alter: true });
      logger.info('Database synchronized (development mode)');
    }

    logger.info('Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Error during migration:', error);
    process.exit(1);
  }
}

// Run migration if called directly
if (require.main === module) {
  migrate();
}

module.exports = migrate;
