import React from 'react';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ExternalLink, Code2, Users2, Sparkles, BookOpen } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="app-container">
      <Header />

      <div className="page-header">
        <h2 className="gradient-text">About GitHub Follow Manager</h2>
        <p>A mission to make GitHub relationship management professional and seamless.</p>
      </div>

      <div className="about-content">
        <div className="about-main">
          <Card className="about-card hero" noHover>
            <Sparkles size={24} className="hero-icon accent-blue" />
            <h3>Modern Profile Management</h3>
            <p>
              This tool helps developers maintain a healthy following-to-follower ratio by identifying non-mutual connections and fans. Built with performance and security in mind.
            </p>
          </Card>

          <div className="about-grid">
            <Card className="about-feature-card" noHover>
              <Code2 size={20} className="accent-green" />
              <h4>Tech Stack</h4>
              <ul>
                <li>React 18 & TypeScript</li>
                <li>Vite 6</li>
                <li>Framer Motion</li>
                <li>Lucide Icons</li>
              </ul>
            </Card>

            <Card className="about-feature-card" noHover>
              <Users2 size={20} className="accent-red" />
              <h4>Open Source</h4>
              <p>Designed for contributors. Modular architecture allows for easy feature additions and scaling.</p>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="about-link">
                View Source <ExternalLink size={14} />
              </a>
            </Card>
          </div>
        </div>

        <aside className="about-sidebar">
          <Card className="docs-card" noHover glass>
             <div className="docs-header">
                <BookOpen size={18} />
                <h3>Quick Guide</h3>
             </div>
             <ol className="docs-list">
                <li>Create a Classic Token.</li>
                <li>Grant <code>read:user</code> and <code>user:follow</code>.</li>
                <li>Login and start analyzing.</li>
                <li>Use Bulk Actions for speed.</li>
             </ol>
          </Card>
          
          <div className="about-footer">
             <p>© 2026 Arsh Verma</p>
             <p>Built with Antigravity AI</p>
          </div>
        </aside>
      </div>
    </div>
  );
};
