# Projeto Glúteo Gigante™ - Replit Configuration

## Overview

This is a full-stack web application for a premium fitness membership site focused on glute development. The application features a React frontend with Express backend, implementing a secure login system and member-only content area. It's designed as a Progressive Web App (PWA) with mobile-first responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state, localStorage for client state
- **Routing**: Wouter for lightweight client-side routing
- **PWA Features**: Service Worker for offline caching, Web App Manifest

### Backend Architecture  
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development**: Hot-reload with Vite integration in development mode

### Key Design Decisions

**Frontend Choices:**
- Shadcn/ui over other UI libraries for consistency and customization
- Wouter instead of React Router for smaller bundle size
- TanStack Query for robust server state management
- TypeScript for type safety across the application

**Backend Choices:**
- Express.js for simplicity and ecosystem maturity
- Drizzle ORM for type-safe database operations
- PostgreSQL for reliable data persistence
- Modular route registration pattern for scalability

## Key Components

### Authentication System
- Simple credential-based authentication using localStorage
- Hard-coded credentials for demo purposes: `user236@projetogluteogigante.com` / `123654`
- Client-side auth state management with automatic redirects
- Protected routes that require authentication

### Progress Tracking
- Local storage-based progress tracking system
- Lesson completion tracking with visual progress indicators
- Achievement system with unlockable badges
- 30-day transformation timeline tracking

### Content Management
- Modular lesson system with expandable content cards
- Rich content format supporting examples, tips, and warnings
- Interactive lesson completion with real-time progress updates

### PWA Features
- Service worker for offline content caching
- App manifest for installable web app experience
- Mobile-optimized touch interactions and responsive design

## Data Flow

1. **Authentication Flow**: User enters credentials → Client validates → Sets localStorage flags → Redirects to dashboard
2. **Content Flow**: Dashboard loads → Fetches progress from localStorage → Renders modules with completion state
3. **Progress Flow**: User completes lesson → Updates localStorage → Triggers UI re-render → Updates progress indicators
4. **PWA Flow**: Service worker intercepts requests → Serves cached content when offline → Updates cache on network availability

## External Dependencies

### UI and Styling
- **Shadcn/ui**: Complete component library with theming
- **Radix UI**: Accessible primitive components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### State and Data Management
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing solution
- **React Hook Form**: Form validation and management

### Database and Backend
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL hosting
- **Express.js**: Web application framework

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles Express server to `dist/index.js`
- Single production build command handles both frontend and backend

### Environment Configuration
- Development: Vite dev server with Express API proxy
- Production: Express serves static files and API routes
- Database: Environment variable `DATABASE_URL` for connection string

### PWA Deployment
- Service worker caches static assets and API responses
- App manifest enables "Add to Home Screen" functionality
- Optimized for mobile-first deployment strategy

### Scalability Considerations
- Modular route structure allows easy API expansion
- Component-based UI architecture supports feature additions
- Database schema uses UUID primary keys for horizontal scaling
- localStorage-based progress can be migrated to database when needed