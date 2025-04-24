import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './components/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import { ErrorBoundary } from 'react-error-boundary';

// Fallback UI for errors
function ErrorFallback({ error }) {
  return (
    <div role="alert" style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24' }}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

// Render the application
// The root element is the main entry point for the React application, where the entire app is rendered into the DOM.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
