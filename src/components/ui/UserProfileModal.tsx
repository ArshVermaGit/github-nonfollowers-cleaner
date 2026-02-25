import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Link as LinkIcon, Building, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import axios from 'axios';

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  blog: string;
  company: string;
  created_at: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface UserProfileModalProps {
  login: string;
  token: string;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ login, token, onClose }) => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://api.github.com/users/${login}`, {
          headers: { Authorization: `token ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [login, token]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <Card className="profile-modal-card" noHover>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
          
          {loading ? (
            <div className="modal-loading">
               <span className="spinner"></span>
               <p>Fetching @{login}...</p>
            </div>
          ) : data ? (
            <div className="profile-details">
              <div className="profile-header">
                <img src={`https://github.com/${login}.png?size=120`} alt={login} className="profile-avatar" />
                <div className="profile-title">
                   <h2>{data.name || login}</h2>
                   <p className="accent-blue">@{login}</p>
                </div>
              </div>

              {data.bio && <p className="profile-bio">{data.bio}</p>}

              <div className="profile-meta-grid">
                {data.location && <div className="meta-item"><MapPin size={14} /> {data.location}</div>}
                {data.company && <div className="meta-item"><Building size={14} /> {data.company}</div>}
                {data.blog && (
                  <a href={data.blog} target="_blank" rel="noreferrer" className="meta-item link">
                    <LinkIcon size={14} /> Website
                  </a>
                )}
                <div className="meta-item"><Calendar size={14} /> Joined {new Date(data.created_at).toLocaleDateString()}</div>
              </div>

              <div className="profile-stats-bar">
                <div className="p-stat"><strong>{data.followers}</strong> <span>Followers</span></div>
                <div className="p-stat"><strong>{data.following}</strong> <span>Following</span></div>
                <div className="p-stat"><strong>{data.public_repos}</strong> <span>Repos</span></div>
              </div>

              <div className="modal-footer">
                <Button onClick={() => window.open(`https://github.com/${login}`, '_blank')}>
                   View Github Profile
                </Button>
              </div>
            </div>
          ) : (
            <p className="error">Failed to load user data.</p>
          )}
        </Card>
      </motion.div>
    </div>
  );
};
