import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Callback from './components/Callback';
import { useEffect } from 'react';

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
