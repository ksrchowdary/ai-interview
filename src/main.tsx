import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initAuth } from './lib/auth';
import { initPerformanceMonitoring } from './lib/performance/monitor';
import { ErrorBoundary } from './lib/performance/errorBoundary';
import App from './App';
import './index.css';

// Initialize auth and performance monitoring
initAuth().catch(console.error);
initPerformanceMonitoring();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);