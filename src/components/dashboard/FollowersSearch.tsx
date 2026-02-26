import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { UserItem } from './UserItem';
import { toast } from 'sonner';
import type { UserWithState, BulkStatus } from '../../types/github';

interface FollowersSearchProps {
  onViewProfile: (login: string) => void;
  followers: UserWithState[];
  isSearching: boolean;
  searchProgress: number;
  searchProgressLabel: string;
  bulkStatus: BulkStatus;
  searchAccount: (username: string) => Promise<void>;
  handleFollowAction: (login: string) => Promise<void>;
}

export const FollowersSearch: React.FC<FollowersSearchProps> = ({ 
  onViewProfile,
  followers,
  isSearching,
  searchProgress,
  searchProgressLabel,
  searchAccount,
  handleFollowAction
}) => {
  const [username, setUsername] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    try {
      await searchAccount(username);
    } catch (err) {
      console.error(err);
      toast.error('Search failed');
    }
  };

  return (
    <div className="followers-search-section">
      <div className="premium-card no-hover" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} className="search-bar-form" style={{ display: 'flex', gap: '1rem' }}>
          <div className="input-wrapper" style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="Enter GitHub username to find followers..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSearching}
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSearching || !username}
            style={{ padding: '0 2rem' }}
          >
            {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            <span>Search</span>
          </button>
        </form>

        {isSearching && (
          <div className="progress-container" style={{ marginTop: '2rem' }}>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${searchProgress}%` }} />
            </div>
            <div className="progress-info">
              <span className="progress-label">{searchProgressLabel}</span>
            </div>
          </div>
        )}
      </div>

      {followers.length > 0 && (
        <div className="user-list">
          {followers.map((user, idx) => (
            <UserItem 
              key={user.login}
              user={user}
              index={idx}
              onAction={(login) => handleFollowAction(login)}
              onViewProfile={onViewProfile}
              actionLabel="Follow"
              badgeLabel="Follower"
              badgeType="success"
            />
          ))}
        </div>
      )}

      {!isSearching && followers.length === 0 && username && (
        <div className="empty-state" style={{ marginTop: '4rem' }}>
          <h3>No followers found or searched yet</h3>
          <p>Enter a username and press Search to see their followers</p>
        </div>
      )}
    </div>
  );
};
