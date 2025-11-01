import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import JobList from './pages/Jobs/JobList';
import JobDetail from './pages/Jobs/JobDetail';
import JobSeekerDashboard from './pages/Dashboard/JobSeekerDashboard';
import RecruiterDashboard from './pages/Dashboard/RecruiterDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import PostJob from './pages/Recruiter/PostJob';

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles?: string[];
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Dashboard Router Component
const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'RECRUITER':
      return <RecruiterDashboard />;
    case 'JOB_SEEKER':
    default:
      return <JobSeekerDashboard />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Layout><JobList /></Layout>} />
          <Route path="/jobs/:id" element={<Layout><JobDetail /></Layout>} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Layout showFooter={false}>
                  <DashboardRouter />
                </Layout>
              </ProtectedRoute>
            } 
          />
          
          {/* Recruiter Routes */}
          <Route 
            path="/recruiter" 
            element={
              <ProtectedRoute allowedRoles={['RECRUITER']}>
                <Layout showFooter={false}>
                  <RecruiterDashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recruiter/post-job" 
            element={
              <ProtectedRoute allowedRoles={['RECRUITER']}>
                <Layout showFooter={false}>
                  <PostJob />
                </Layout>
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <Layout showFooter={false}>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
