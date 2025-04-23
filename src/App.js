import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Callback from './components/Callback';

function ProtectedRoute({ children }) {
    const {user, loading} = useAuth();
    console.log('ProtectedRoute Auth State:', {user, loading});

    if (loading) {
        return <div>Loading authentication state...</div>;
    }

    return user ? children : <Navigate to="/login" replace />;
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
