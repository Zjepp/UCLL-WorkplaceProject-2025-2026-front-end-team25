# Front-End Team 25 - Expo React Native App

This is an Expo React Native application for Android and iOS.

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn
- For Android: Android Studio and Android SDK
- For iOS: Xcode (macOS only)

### Installation

1. Navigate to the app directory:
```bash
cd IPSA_VZW
```

2. Install dependencies:
```bash
npm install
```

### Running the App

**Start the development server:**
```bash
npm start
```

**Run on Android:**
```bash
npm run android
```

**Run on iOS:**
```bash
npm run ios
```

**Run on Web:**
```bash
npm run web
```

## 📱 Project Structure

```
IPSA_VZW/
├── app/              # Expo Router pages (file-based routing)
│   ├── index.tsx     # Home screen
│   └── _layout.tsx   # Root layout
├── assets/           # Images, fonts, etc.
├── components/       # Reusable components
├── constants/        # App constants
└── hooks/            # Custom React hooks
```

## 🔧 Development

- **Expo Router**: File-based routing (like Next.js)
- **TypeScript**: Full type safety
- **React Native**: Cross-platform mobile development

## 📦 CI/CD

GitHub Actions workflows:
- **main.yaml**: Tests the Expo app and builds/pushes Docker image for web version
- **sigrid-*.yml**: Code quality analysis

### Docker Deployment

The web version is automatically built and pushed to GitHub Container Registry on every push to `main`.

**Build locally:**
```bash
docker build -t expo-web-app .
```

**Run locally:**
```bash
docker run -p 8080:80 expo-web-app
```

Then visit http://localhost:8080

**Pull from registry:**
```bash
docker pull ghcr.io/ucll-workplaceproject-2025-2026/front-end-team25:main
docker run -p 8080:80 ghcr.io/ucll-workplaceproject-2025-2026/front-end-team25:main
```

## 📖 Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
