# 🍭 Switter

## 🎯 Overview
Developed a full-stack Twitter/X-inspired social media app using React, TypeScript, and Firebase, featuring real-time updates, user authentication, and image uploads.

## ⚡ Core Features
- 🔐 Authentication
  - Email/Password login
  - GitHub OAuth integration
  - Protected routes
- 📝 Posts
  - Create tweets with text (180 chars limit)
  - Upload images (1MB limit)
  - Delete own tweets
  - Real-time timeline updates
- 👤 Profile
  - Custom avatar upload
  - Display name customization
  - Personal tweet history

## 🛠 Tech Stack
- Frontend
  - React 19
  - TypeScript
  - Styled Components
  - React Router 6
- Backend (Firebase)
  - Authentication
  - Cloud Firestore
  - Cloud Storage
  - Hosting
- Build Tools
  - Vite
  - ESLint

## 📁 Project Structure
```
src/
├── components/    # Reusable UI components
├── routes/       # Page components & routing
├── utils/        # Themes & constants
└── firebase.ts   # Firebase configuration
```

## 🚀 Getting Started
1. Clone the repository
```bash
git clone https://github.com/your-username/letsue-firebase.git
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
- Create a new Firebase project
- Enable Authentication (Email & GitHub)
- Set up Firestore Database
- Configure Storage rules
- Update `src/firebase.ts` with your config

4. Development & Deployment
```bash
# Development
npm run dev

# Production Build & Deploy
npm run deploy
```

## 💡 Development Notes
- Local development: Use `signInWithPopup()`
- Production: Use `signInWithRedirect()`
- Image restrictions: 1MB max size
- Tweet length: 180 characters max
- Real-time updates using Firestore listeners

## 🎨 Styling & Theme
- Dark theme by default
- Styled with styled-components
- Customizable theme in `src/utils/theme.ts`
- Responsive design

## 🔒 Security Features
- Protected routes for authenticated users
- Secure file uploads
- User-specific content management
- Firebase security rules

## 🌟 Future Improvements
- Password reset functionality
- Tweet editing
- Profile name editing feature
- Automatic page refresh after tweet deletion
- Enhanced image upload with size validation
- Edit tweet functionality
