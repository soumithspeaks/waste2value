// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://localhost:3000/api/v1' 
    : 'https://api.waste2value.com/api/v1',
  TIMEOUT: 30000,
  SOCKET_URL: __DEV__ 
    ? 'http://localhost:3000' 
    : 'https://api.waste2value.com',
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Waste2Value',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@waste2value.com',
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES: 5,
};

// Waste Categories
export const WASTE_CATEGORIES = {
  ORGANIC: 'organic',
  PLASTIC: 'plastic',
  PAPER: 'paper',
  METAL: 'metal',
  GLASS: 'glass',
  EWASTE: 'ewaste',
  HAZARDOUS: 'hazardous',
};

// Pickup Status
export const PICKUP_STATUS = {
  PENDING: 'pending',
  SEARCHING_AGENT: 'searching_agent',
  AGENT_ASSIGNED: 'agent_assigned',
  AGENT_ENROUTE: 'agent_enroute',
  AGENT_ARRIVED: 'agent_arrived',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Colors
export const COLORS = {
  primary: '#2E7D32',
  secondary: '#FFA726',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  disabled: '#BDBDBD',
};

// Screen Names
export const SCREENS = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Main
  HOME: 'Home',
  CAMERA: 'Camera',
  PICKUP: 'Pickup',
  HISTORY: 'History',
  PROFILE: 'Profile',
  
  // Pickup Flow
  WASTE_CLASSIFICATION: 'WasteClassification',
  PICKUP_REQUEST: 'PickupRequest',
  AGENT_MATCHING: 'AgentMatching',
  TRACK_PICKUP: 'TrackPickup',
  PICKUP_COMPLETE: 'PickupComplete',
  
  // Profile
  WALLET: 'Wallet',
  ADDRESSES: 'Addresses',
  SETTINGS: 'Settings',
  HELP: 'Help',
};
