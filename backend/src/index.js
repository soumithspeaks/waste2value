require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const http = require('http');
const { Server } = require('socket.io');

const config = require('./config');
const logger = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

// Import routes
const authRoutes = require('./api/routes/auth.routes');
const userRoutes = require('./api/routes/user.routes');
const agentRoutes = require('./api/routes/agent.routes');
const pickupRoutes = require('./api/routes/pickup.routes');
const wasteRoutes = require('./api/routes/waste.routes');
const paymentRoutes = require('./api/routes/payment.routes');
const godownRoutes = require('./api/routes/godown.routes');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: config.cors.origin,
    methods: ['GET', 'POST']
  }
});

// Make io accessible to routes
app.set('io', io);

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
const apiPrefix = `/api/${config.api.version}`;
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/users`, userRoutes);
app.use(`${apiPrefix}/agents`, agentRoutes);
app.use(`${apiPrefix}/pickups`, pickupRoutes);
app.use(`${apiPrefix}/waste`, wasteRoutes);
app.use(`${apiPrefix}/payments`, paymentRoutes);
app.use(`${apiPrefix}/godowns`, godownRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`New socket connection: ${socket.id}`);

  // Agent location updates
  socket.on('agent:location', (data) => {
    socket.broadcast.emit('agent:location:update', {
      agentId: data.agentId,
      location: data.location,
      timestamp: new Date()
    });
  });

  // Pickup status updates
  socket.on('pickup:status', (data) => {
    io.to(`pickup:${data.pickupId}`).emit('pickup:status:update', data);
  });

  // Join pickup room
  socket.on('pickup:join', (pickupId) => {
    socket.join(`pickup:${pickupId}`);
    logger.info(`Socket ${socket.id} joined pickup room: ${pickupId}`);
  });

  // Leave pickup room
  socket.on('pickup:leave', (pickupId) => {
    socket.leave(`pickup:${pickupId}`);
    logger.info(`Socket ${socket.id} left pickup room: ${pickupId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.server.port;

const startServer = async () => {
  try {
    // Test database connection
    const db = require('./models');
    await db.sequelize.authenticate();
    logger.info('Database connection established successfully');

    // Sync database (use migrations in production)
    if (config.server.env === 'development') {
      await db.sequelize.sync({ alter: false });
      logger.info('Database synchronized');
    }

    // Start listening
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${config.server.env} mode`);
      logger.info(`API available at http://localhost:${PORT}/api/${config.api.version}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, closing server gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

startServer();

module.exports = { app, server, io };
