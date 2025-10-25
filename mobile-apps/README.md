# Waste2Value Mobile Apps

This directory contains the mobile applications for the Waste2Value platform.

## Apps

### User App
Consumer-facing mobile application for waste disposal and recycling.

**Key Features:**
- AI-powered waste classification using camera
- Real-time agent matching and tracking
- Incentivized payments for recycling
- Dashboard with environmental impact metrics
- Scheduled and recurring pickups
- Wallet and transaction management

**Tech Stack:**
- React Native 0.72
- Redux Toolkit for state management
- React Navigation for routing
- React Native Paper for UI components
- Axios for API calls
- Socket.IO for real-time communication

### Agent App
Waste collector-facing mobile application for managing pickups.

**Key Features:**
- Real-time location tracking
- Instant pickup request notifications
- Optimized route navigation
- Earnings tracker and payout management
- Performance metrics and ratings
- Godown management system

**Tech Stack:**
- React Native 0.72
- Redux Toolkit for state management
- React Navigation for routing
- React Native Paper for UI components
- Axios for API calls
- Socket.IO for real-time communication

## Development Setup

### Prerequisites

1. **Node.js** (>= 16.x)
2. **npm** or **yarn**
3. **React Native development environment**
   - For iOS: Xcode (Mac only)
   - For Android: Android Studio and Android SDK

### Installation

#### User App

```bash
cd mobile-apps/user-app
npm install
```

#### Agent App

```bash
cd mobile-apps/agent-app
npm install
```

### Running the Apps

#### iOS

```bash
# User App
cd mobile-apps/user-app
npm run ios

# Agent App
cd mobile-apps/agent-app
npm run ios
```

#### Android

```bash
# User App
cd mobile-apps/user-app
npm run android

# Agent App
cd mobile-apps/agent-app
npm run android
```

### Development Server

Start the Metro bundler:

```bash
npm start
```

## Project Structure

```
mobile-apps/
├── user-app/
│   ├── src/
│   │   ├── screens/        # Screen components
│   │   ├── components/     # Reusable components
│   │   ├── navigation/     # Navigation configuration
│   │   ├── redux/          # Redux store and slices
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── constants/      # Constants and configs
│   ├── App.js              # App entry point
│   ├── index.js            # Root file
│   └── package.json
│
└── agent-app/
    ├── src/
    │   ├── screens/
    │   ├── components/
    │   ├── navigation/
    │   ├── redux/
    │   ├── services/
    │   ├── utils/
    │   └── constants/
    ├── App.js
    ├── index.js
    └── package.json
```

## Key Dependencies

### Navigation
- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator

### State Management
- `@reduxjs/toolkit` - State management
- `react-redux` - React bindings for Redux

### UI Components
- `react-native-paper` - Material Design components
- `react-native-vector-icons` - Icon library

### Networking
- `axios` - HTTP client
- `socket.io-client` - Real-time communication

### Maps & Location
- `react-native-maps` - Map components
- `react-native-geolocation-service` - Location services

### Media
- `react-native-image-picker` - Image/camera picker

### Storage
- `@react-native-async-storage/async-storage` - Local storage

## Environment Variables

Create a `.env` file in each app directory:

```env
API_URL=http://localhost:3000/api/v1
SOCKET_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_key_here
```

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Build for Production

### Android

```bash
cd android
./gradlew assembleRelease
```

### iOS

```bash
cd ios
xcodebuild -workspace Waste2Value.xcworkspace -scheme Waste2Value -configuration Release
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npm start -- --reset-cache`
2. **iOS build failures**: Try `cd ios && pod install`
3. **Android build failures**: Clean with `cd android && ./gradlew clean`

## Contributing

Please read the [Contributing Guide](../../docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
