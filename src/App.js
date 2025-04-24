import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Callback from './components/Callback';
import { useEffect } from 'react';

// Define a ProtectedRoute component to protect routes that require authentication, requiring the user to be logged in to access them.
function ProtectedRoute({ children }) {
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !user) {
        navigate('/login', { replace: true });
      }
    }, [user, loading, navigate]);

    if (loading) {
        return <div>Loading authentication state...</div>;
    }

    return user ? children : null;
}

// Define the main App component, which sets up the routing for the application.
// The App component uses React Router to define the routes for the application, including a login route, a callback route, and a protected home route.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App;
