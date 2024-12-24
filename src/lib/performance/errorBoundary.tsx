import React, { Component, ErrorInfo } from 'react';
import { supabase } from '../supabase';
import { useStore } from '@/store';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    const user = useStore.getState().user;
    
    // Log error to Supabase
    supabase
      .from('error_logs')
      .insert([{
        error: error.message,
        stack: error.stack,
        component: errorInfo.componentStack,
        user_id: user?.id,
        timestamp: new Date().toISOString()
      }])
      .then(() => {
        console.debug('Error logged successfully');
      })
      .catch((err) => {
        console.debug('Failed to log error:', err);
      });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-4">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}