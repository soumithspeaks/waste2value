const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const db = require('../../models');
const config = require('../../config');
const logger = require('../../utils/logger');

// Generate JWT token
const generateToken = (user, isAgent = false) => {
  return jwt.sign(
    { id: user.id, isAgent },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

// Generate refresh token
const generateRefreshToken = (user, isAgent = false) => {
  return jwt.sign(
    { id: user.id, isAgent },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn }
  );
};

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { name, email, phone, password, referralCode } = req.body;

    // Check if user already exists
    const existingUser = await db.User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate referral code
    const userReferralCode = `W2V${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create user
    const user = await db.User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      referralCode: userReferralCode,
      referredBy: referralCode ? (await db.User.findOne({ where: { referralCode } }))?.id : null
    });

    // Create wallet
    await db.Wallet.create({
      userId: user.id
    });

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    logger.info(`New user registered: ${user.id}`);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          referralCode: user.referralCode
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        status: 'error',
        message: 'Account is deactivated'
      });
    }

    // Update last login
    await user.update({ lastLoginAt: new Date() });

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          profilePicture: user.profilePicture
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

// Register Agent
exports.registerAgent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { name, email, phone, password, vehicleType, vehicleNumber, vehicleCapacity } = req.body;

    // Check if agent already exists
    const existingAgent = await db.Agent.findOne({
      where: { email }
    });

    if (existingAgent) {
      return res.status(409).json({
        status: 'error',
        message: 'Agent with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create agent
    const agent = await db.Agent.create({
      name,
      email,
      phone,
      password: hashedPassword,
      vehicleType,
      vehicleNumber,
      vehicleCapacity: vehicleCapacity || 100
    });

    // Create wallet
    await db.Wallet.create({
      agentId: agent.id
    });

    // Generate tokens
    const token = generateToken(agent, true);
    const refreshToken = generateRefreshToken(agent, true);

    logger.info(`New agent registered: ${agent.id}`);

    res.status(201).json({
      status: 'success',
      message: 'Agent registered successfully',
      data: {
        agent: {
          id: agent.id,
          name: agent.name,
          email: agent.email,
          phone: agent.phone,
          vehicleType: agent.vehicleType
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login Agent
exports.loginAgent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find agent
    const agent = await db.Agent.findOne({ where: { email } });

    if (!agent) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, agent.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check if agent is active
    if (!agent.isActive) {
      return res.status(403).json({
        status: 'error',
        message: 'Account is deactivated'
      });
    }

    // Update last active
    await agent.update({ lastActiveAt: new Date() });

    // Generate tokens
    const token = generateToken(agent, true);
    const refreshToken = generateRefreshToken(agent, true);

    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        agent: {
          id: agent.id,
          name: agent.name,
          email: agent.email,
          phone: agent.phone,
          profilePicture: agent.profilePicture,
          isOnline: agent.isOnline
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

// Refresh Token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Refresh token required'
      });
    }

    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);

    // Generate new tokens
    const newToken = generateToken({ id: decoded.id }, decoded.isAgent);
    const newRefreshToken = generateRefreshToken({ id: decoded.id }, decoded.isAgent);

    res.json({
      status: 'success',
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid refresh token'
    });
  }
};

// Verify OTP (stub implementation)
exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, phone, otp } = req.body;

    // TODO: Implement OTP verification logic
    // For now, return success
    res.json({
      status: 'success',
      message: 'OTP verified successfully'
    });
  } catch (error) {
    next(error);
  }
};
