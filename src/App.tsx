import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { store, RootState } from './store';
import { lightTheme, darkTheme } from './theme';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { LoginForm } from './components/auth/LoginForm';
import HomePage from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { WelcomePage } from './pages/WelcomePage';
import { AuthRedirect } from './components/common/AuthRedirect';
import { CoursesPage } from './pages/CoursesPage';
import { PricingPage } from './pages/PricingPage';
import { AITutorPage } from './pages/AITutorPage';
import { TVPage } from './pages/TVPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ChildrenPage } from './pages/ChildrenPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TasksPage } from './pages/TasksPage';

const ThemedApp: React.FC = () => {
  const { mode } = useSelector((state: RootState) => state.theme);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/pricing" element={<PricingPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            {/* Default route for authenticated users */}
            <Route
              path="/welcome"
              element={
                <ProtectedRoute>
                  <WelcomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />
            
            {/* Parent Only Routes */}
            <Route
              path="/children"
              element={
                <ProtectedRoute roles={['parent', 'admin']}>
                  <ChildrenPage />
                </ProtectedRoute>
              }
            />
            
            {/* Additional Routes (Placeholder) */}
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-tutor"
              element={
                <ProtectedRoute>
                  <AITutorPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <ProtectedRoute>
                  <AchievementsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tv"
              element={
                <ProtectedRoute>
                  <TVPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <div>Settings Page - Coming Soon</div>
                </ProtectedRoute>
              }
            />

            {/* Redirect root to /welcome if authenticated, else HomePage */}
            <Route
              path="*"
              element={
                <AuthRedirect />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;