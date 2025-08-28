# GrowTogether AI - Learning Management System

A comprehensive AI-powered Learning Management System designed for children, built with React, TypeScript, Material-UI, and RTK Query.

## 🌟 Features

### 🤖 AI-Powered Learning
- Personalized learning paths adapted to each child's pace and style
- AI tutor for interactive assistance and guidance
- Auto-generated quizzes and assessments
- Smart content recommendations based on learning patterns

### 👨‍👩‍👧‍👦 Family-Friendly Design
- Role-based access for Parents, Students, and Admins
- Multiple children profiles per parent account
- Comprehensive parental controls and safety settings
- Age-appropriate content filtering

### 📊 Analytics & Progress Tracking
- Real-time learning analytics with interactive charts
- Progress tracking across multiple subjects
- Weekly and monthly learning insights
- Strength and weakness identification

### 🎮 Gamification
- Achievement badges and rewards system
- Learning streaks and challenges
- Interactive courses with engaging content
- TV-first experience for living room learning

### 💳 Flexible Pricing
- Freemium model with basic features
- Premium plans with advanced AI features
- Family plans supporting multiple children
- Secure payment integration (Stripe, PayPal, Razorpay)

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe development
- **Material-UI (MUI)** for consistent, accessible UI components
- **RTK Query** for efficient API state management
- **React Router v6** for client-side routing
- **Framer Motion** for smooth animations and transitions

### State Management
- **Redux Toolkit** for global state management
- **RTK Query** for API caching and synchronization
- Separate slices for authentication, theme, and feature-specific state

### Design System
- Custom MUI theme with light/dark mode support
- Consistent color palette with primary, secondary, and accent colors
- Responsive design with mobile-first approach
- WCAG 2.1 accessibility compliance

### Code Organization
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   ├── ui/             # Basic UI components
│   └── common/         # Common components (ProtectedRoute, etc.)
├── features/           # Feature-specific components and logic
│   ├── auth/           # Authentication related components
│   ├── dashboard/      # Dashboard components
│   ├── courses/        # Course management
│   ├── pricing/        # Pricing and payments
│   └── analytics/      # Analytics and reporting
├── pages/              # Page-level components
├── store/              # Redux store configuration
│   ├── api/           # RTK Query API slices
│   └── slices/        # Redux slices
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── data/               # Mock data and constants
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with ES6+ support

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://your-backend-api.com
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
VITE_MICROSOFT_OAUTH_CLIENT_ID=your_microsoft_client_id
```

### Backend Integration
The application uses mock data for demonstration. To integrate with a real backend:

1. **Authentication APIs**: Replace mock implementations in `src/store/api/authApi.ts`
2. **Course APIs**: Update endpoints in `src/store/api/coursesApi.ts`
3. **Payment APIs**: Configure real payment providers in `src/store/api/paymentsApi.ts`
4. **Analytics APIs**: Connect to your analytics service

## 🎨 Customization

### Theme Customization
Modify `src/theme/index.ts` to customize:
- Color palette
- Typography scales
- Component styles
- Breakpoints and spacing

### Adding New Features
1. Create feature directory in `src/features/`
2. Add API slice in `src/store/api/`
3. Create page component in `src/pages/`
4. Update routing in `src/App.tsx`
5. Add navigation items in `src/components/layout/Sidebar.tsx`

## 🔒 Security Features

### Authentication
- OAuth integration with major providers (Google, Microsoft, Yahoo, Outlook)
- Role-based access control
- Protected routes with automatic redirects
- Secure token management

### Parental Controls
- Content filtering and age-appropriate restrictions
- Screen time management
- Safe mode for younger children
- Privacy settings and data protection

### Data Protection
- Client-side input validation
- Secure API communication
- User data encryption
- GDPR compliance ready

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:
- **Mobile** (< 768px): Simplified navigation, touch-optimized controls
- **Tablet** (768px - 1024px): Balanced layout with collapsible sidebar
- **Desktop** (> 1024px): Full-featured layout with persistent sidebar

## 🎯 Target Audience

### Primary Users
- **Parents**: Managing children's learning progress and safety
- **Students**: Engaging with interactive learning content
- **Educators**: Creating and managing educational content

### Age Groups
- **Elementary** (5-10 years): Visual learning, games, basic concepts
- **Middle School** (11-14 years): STEM subjects, creative projects
- **High School** (15-18 years): Advanced topics, career preparation

## 🚧 Future Enhancements

### AI Features
- Voice-activated AI tutor
- Emotion recognition for adaptive learning
- Advanced natural language processing
- Computer vision for handwriting analysis

### Platform Extensions
- Mobile app (React Native)
- Desktop application (Electron)
- Smart TV applications
- VR/AR learning experiences

### Advanced Analytics
- Predictive learning outcomes
- Personalized intervention recommendations
- Parent-teacher communication platform
- Learning disability detection and support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Maintain 80%+ test coverage
- Use conventional commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@growtogether-ai.com
- 💬 Discord: [GrowTogether AI Community](https://discord.gg/growtogether)
- 📖 Documentation: [docs.growtogether-ai.com](https://docs.growtogether-ai.com)
- 🐛 Issues: [GitHub Issues](https://github.com/growtogether-ai/lms/issues)

---

**Built with ❤️ by the GrowTogether AI Team**

*Empowering the next generation through AI-powered education*