import React from 'react';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trash2, ShieldCheck, Database, HardDrive } from 'lucide-react';
import { toast } from 'sonner';

export const SettingsPage: React.FC = () => {
  const handleClearPersistence = () => {
    localStorage.removeItem('gh_token');
    localStorage.removeItem('gh_user');
    toast.success('Local preferences cleared', {
      description: 'Your token and username have been removed from this browser.'
    });
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="page-header">
        <h2 className="gradient-text">Application Settings</h2>
        <p>Manage your account, credentials, and local data storage.</p>
      </div>

      <div className="settings-grid">
        <Card className="settings-card" noHover>
          <div className="settings-header">
             <ShieldCheck className="accent-blue" size={20} />
             <h3>Security & Credentials</h3>
          </div>
          <p className="settings-desc">Your Personal Access Token is stored only in your browser's LocalStorage and is never sent to any server other than GitHub's API.</p>
          <div className="settings-actions">
            <Button variant="ghost" onClick={handleClearPersistence}>
              <Trash2 size={16} />
              Wipe Local Data
            </Button>
          </div>
        </Card>

        <Card className="settings-card" noHover>
          <div className="settings-header">
             <Database className="accent-green" size={20} />
             <h3>Data Usage</h3>
          </div>
          <p className="settings-desc">The app caches relationship data in-memory during your session for speed. Refreshing the page will clear this cache but keep your login if persistence is enabled.</p>
        </Card>

        <Card className="settings-card" noHover>
          <div className="settings-header">
             <HardDrive className="accent-red" size={20} />
             <h3>System Info</h3>
          </div>
          <div className="info-list">
            <div className="info-item">
              <span>Version</span>
              <code>2.0.0-pro</code>
            </div>
            <div className="info-item">
              <span>Environment</span>
              <code>Production</code>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
