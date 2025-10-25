module.exports = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  api: {
    version: process.env.API_VERSION || 'v1'
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'waste2value',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    dialect: 'postgres',
    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 20,
      min: parseInt(process.env.DB_POOL_MIN) || 5,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE) || 10000
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: process.env.REDIS_DB || 0
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_here',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },
  cors: {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
    credentials: true
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  maps: {
    googleApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    mapboxApiKey: process.env.MAPBOX_API_KEY || ''
  },
  payment: {
    gateway: process.env.PAYMENT_GATEWAY || 'razorpay',
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID || '',
      keySecret: process.env.RAZORPAY_KEY_SECRET || ''
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ''
    }
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    s3BucketName: process.env.S3_BUCKET_NAME || 'waste2value-uploads'
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : ''
  },
  ml: {
    modelEndpoint: process.env.ML_MODEL_ENDPOINT || 'http://localhost:5000/predict',
    apiKey: process.env.ML_MODEL_API_KEY || '',
    confidenceThreshold: parseFloat(process.env.ML_CONFIDENCE_THRESHOLD) || 0.85
  },
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'noreply@waste2value.com'
  },
  sms: {
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || ''
  },
  pricing: {
    organic: parseFloat(process.env.PRICE_ORGANIC) || 2.00,
    plastic: parseFloat(process.env.PRICE_PLASTIC) || 5.00,
    paper: parseFloat(process.env.PRICE_PAPER) || 3.00,
    metal: parseFloat(process.env.PRICE_METAL) || 10.00,
    glass: parseFloat(process.env.PRICE_GLASS) || 4.00,
    ewaste: parseFloat(process.env.PRICE_EWASTE) || 15.00,
    hazardous: parseFloat(process.env.PRICE_HAZARDOUS) || 1.00
  },
  platform: {
    agentCommissionRate: parseFloat(process.env.AGENT_COMMISSION_RATE) || 0.20,
    minPickupWeight: parseFloat(process.env.MIN_PICKUP_WEIGHT) || 1,
    maxPickupWeight: parseFloat(process.env.MAX_PICKUP_WEIGHT) || 1000,
    agentSearchRadiusKm: parseFloat(process.env.AGENT_SEARCH_RADIUS_KM) || 10,
    agentMatchingTimeoutSec: parseInt(process.env.AGENT_MATCHING_TIMEOUT_SEC) || 30
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    filePath: process.env.LOG_FILE_PATH || './logs'
  }
};
