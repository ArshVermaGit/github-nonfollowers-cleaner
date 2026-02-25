import React, { useState } from 'react';
import { Eye, EyeOff, Search, RotateCcw } from 'lucide-react';

interface AuthCardProps {
  onAnalyze: (token: string, username: string) => void;
  onReset: () => void;
  isLoading: boolean;
  progress: number;
  progressLabel: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ 
  onAnalyze, 
  onReset, 
  isLoading, 
  progress, 
  progressLabel 
}) => {
  // Initialize from localStorage directly to avoid setState in effect
  const [token, setToken] = useState(() => localStorage.getItem('gh_token') || '');
  const [username, setUsername] = useState(() => localStorage.getItem('gh_user') || '');
  const [showToken, setShowToken] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token && username) {
      localStorage.setItem('gh_token', token.trim());
      localStorage.setItem('gh_user', username.trim());
      onAnalyze(token.trim(), username.trim());
    }
  };

  const handleReset = () => {
    localStorage.removeItem('gh_token');
    localStorage.removeItem('gh_user');
    setToken('');
    setUsername('');
    onReset();
  };

  return (
    <div className="premium-card auth-card no-hover">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-row">
          <div className="form-group">
            <label>Personal Access Token</label>
            <div className="input-wrapper">
              <input
                type={showToken ? 'text' : 'password'}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxx"
                spellCheck={false}
                autoComplete="off"
              />
              <button 
                type="button" 
                className="input-icon-btn"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="help-text">
              <a href="https://github.com/settings/tokens/new?scopes=read:user,user:follow" target="_blank" rel="noreferrer">
                Create a token
              </a> — tick read:user & user:follow
            </p>
          </div>

          <div className="form-group">
            <label>Your GitHub Username</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your-username"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <p className="help-text">Exactly as shown on your profile</p>
          </div>
        </div>

        <div className="auth-actions">
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading || !token || !username}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <Search size={16} />
            )}
            Fetch & Analyze
          </button>
          
          <button 
            type="button" 
            className="btn-ghost" 
            onClick={handleReset}
            disabled={isLoading}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </form>

      {progress > 0 && (
        <div className="progress-container">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-info">
             <p className="progress-label">{progressLabel}</p>
             <span className="progress-percent">{Math.round(progress)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
