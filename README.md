# AI Course Creation Platform

A web application that leverages artificial intelligence to help educators, trainers, and subject matter experts create comprehensive online courses with minimal effort. The platform generates course outlines, content suggestions, assessment questions, and learning path optimization.

## 🚀 Features

- **AI Course Structure Generation**: Create detailed course outlines and module structures
- **Content Recommendations**: Get AI-generated content suggestions for each module
- **Assessment Creation**: Generate quizzes, assignments, and tests with answer keys
- **Learning Path Optimization**: Analyze course flow and optimize the learning journey
- **Multimedia Integration**: Suggestions for videos, infographics, and interactive elements
- **Accessibility Checking**: Ensure course content meets accessibility standards

## 💻 Tech Stack

### Frontend
- React.js with TypeScript
- Material UI component library
- Redux for state management
- Draft.js for rich text editing
- React Query for data fetching

### Backend
- Node.js with NestJS
- MongoDB for database
- JWT authentication
- OpenAI API integration
- Firebase for file storage

### DevOps
- GitHub Actions for CI/CD
- Docker containerization
- AWS/Vercel deployment
- MongoDB Atlas for cloud database

## 🌟 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)
- OpenAI API key
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/ai-course-creation-platform-20250619.git
cd ai-course-creation-platform-20250619
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Create .env files in both frontend and backend directories
# Backend .env example:
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ai-course-platform
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
FIREBASE_CONFIG=your_firebase_config

# Frontend .env example:
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_FIREBASE_CONFIG=your_firebase_config
```

4. Start development servers
```bash
# Start backend (from backend directory)
npm run start:dev

# Start frontend (from frontend directory)
npm start
```

## 📋 Project Structure

```
ai-course-creation-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models
│   │   ├── modules/         # Feature modules
│   │   ├── dto/             # Data transfer objects
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── main.ts          # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Redux store
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── App.tsx          # Root component
│   │   └── index.tsx        # Entry point
│   └── package.json
│
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for providing the AI technology
- [React](https://reactjs.org/) for the frontend framework
- [NestJS](https://nestjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Material UI](https://material-ui.com/) for the component library