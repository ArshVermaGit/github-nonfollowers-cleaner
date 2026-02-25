import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_error: Error): State {
    // We can log the error if needed
    console.debug('Error boundary caught:', _error);
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card className="error-card" noHover style={{ textAlign: 'center', padding: '3rem', maxWidth: '400px' }}>
            <AlertTriangle size={48} className="accent-red" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ marginBottom: '1rem' }}>Something went wrong</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '14px' }}>
              The application encountered an unexpected error. Don't worry, your data is safe.
            </p>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw size={16} />
              Reload Application
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
