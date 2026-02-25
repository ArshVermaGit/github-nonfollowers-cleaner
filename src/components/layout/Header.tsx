import React from 'react';
import { Github, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="logo-group">
        <div className="logo-box">
          <Github size={24} />
        </div>
        <div className="header-text">
          <h1>
            GitHub <span className="gradient-text">Follow Manager</span>
          </h1>
          <p>Optimize your social graph with precision</p>
        </div>
      </div>
      <div className="version-pill">
        <Zap size={10} className="accent-blue" fill="currentColor" />
        v3.0 Premium 
      </div>
    </header>
  );
};
