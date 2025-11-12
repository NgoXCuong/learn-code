# Learn Code Platform - Frontend

A modern React-based frontend for an interactive coding learning platform featuring courses, challenges, code compilation, and user progress tracking.

## Features

- **Interactive Learning Interface**: Browse and enroll in programming courses
- **Code Editor**: Integrated Monaco editor for coding exercises and challenges
- **Real-time Compilation**: Execute code directly in the browser
- **User Authentication**: Login/register system with profile management
- **Progress Tracking**: Monitor learning progress and achievements
- **Challenges System**: Daily coding challenges and competitive programming
- **Rankings**: Leaderboards and user rankings
- **Responsive Design**: Mobile-friendly interface with dark/light mode
- **Chatbot Support**: AI-powered assistance for learners

## Tech Stack

- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Radix UI** - Accessible, unstyled UI components
- **Monaco Editor** - Professional code editor (same as VS Code)
- **React Router** - Client-side routing and navigation
- **Framer Motion** - Animation library for smooth transitions
- **React Hook Form** - Form handling and validation
- **Sonner** - Toast notifications
- **Lucide React** - Beautiful icon library

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
frontend/
├── public/                 # Static assets
│   └── logo.png
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (buttons, cards, etc.)
│   │   ├── layout/        # Layout components (header, footer)
│   │   ├── home/          # Home page components
│   │   ├── courses/       # Course-related components
│   │   ├── challenges/    # Challenge components
│   │   ├── compiler/      # Code editor and compiler
│   │   ├── exam/          # Quiz and exam components
│   │   ├── profile/       # User profile components
│   │   └── rankings/      # Leaderboard components
│   ├── pages/             # Page components
│   ├── context/           # React context providers
│   ├── mock/              # Mock data for development
│   ├── utils/             # Utility functions
│   ├── api/               # API service functions
│   ├── assets/            # Static assets (icons, images)
│   ├── lib/               # Library configurations
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── components.json        # shadcn/ui configuration
└── eslint.config.js       # ESLint configuration
```

## Key Components

### Pages

- **Home** - Landing page with featured courses
- **Courses** - Course catalog and enrollment
- **Compiler** - Code editor with compilation
- **Challenges** - Coding challenges and leaderboards
- **Profile** - User dashboard and progress
- **Rankings** - Global user rankings

### Core Features

- **Authentication** - Login/register with context management
- **Course Management** - Browse, enroll, and track progress
- **Code Execution** - Real-time code compilation and testing
- **Challenge System** - Daily challenges with scoring
- **Progress Tracking** - Statistics, badges, and streaks

## Development

### Code Style

- Uses ESLint for code quality
- Prettier for code formatting (via ESLint)
- Follows React best practices and hooks patterns

### State Management

- React Context for global state (auth, user courses)
- Local component state for UI interactions

### API Integration

- RESTful API calls to backend services
- Mock data available for development without backend

## Contributing

1. Follow the existing code style and patterns
2. Test components thoroughly
3. Ensure responsive design works on mobile devices
4. Add proper TypeScript types if extending with TS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
