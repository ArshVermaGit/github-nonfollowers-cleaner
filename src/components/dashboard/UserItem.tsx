import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, XCircle, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { UserWithState } from '../../types/github';
import { clsx } from 'clsx';

interface UserItemProps {
  user: UserWithState;
  onAction: (login: string) => void;
  onViewProfile?: (login: string) => void;
  actionLabel: string;
  badgeLabel: string;
  badgeType: 'danger' | 'success';
  index: number;
}

export const UserItem: React.FC<UserItemProps> = ({
  user,
  onAction,
  onViewProfile,
  actionLabel,
  badgeLabel,
  badgeType,
  index
}) => {
  const isDone = user.state === 'done';
  const isLoading = user.state === 'loading';
  const isError = user.state === 'error';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: Math.min(index * 0.03, 0.3), 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <Card className={clsx("user-item-card", isDone && "done")} noHover={isDone}>
        <div className="user-avatar-wrap" onClick={() => onViewProfile?.(user.login)}>
          <img src={`${user.avatar_url}&s=100`} alt={user.login} className="user-avatar" loading="lazy" />
          <div className="avatar-overlay">
             <Search size={18} />
          </div>
        </div>

        <div className="user-details">
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noreferrer" 
            className="user-login-link"
          >
            @{user.login}
            <ExternalLink size={14} style={{ display: 'inline', marginLeft: '6px', opacity: 0.5 }} />
          </a>
          {user.name && <div className="user-full-name">{user.name}</div>}
        </div>

        <Badge variant={isDone ? 'done' : badgeType}>
          {isDone ? `✓ ${badgeLabel === 'Mutual' ? 'mutual' : (badgeType === 'danger' ? 'unfollowed' : 'following')}` : badgeLabel}
        </Badge>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAction(user.login);
          }}
          variant={isDone ? 'primary' : isError ? 'primary' : badgeType === 'success' ? 'success' : 'danger'}
          loading={isLoading}
          disabled={isDone}
          className={clsx(
            "action-btn-pill",
            isDone && "action-done",
            isError && "action-retry"
          )}
        >
          {isDone ? <Check size={16} /> : isError ? <XCircle size={16} /> : actionLabel}
        </Button>
      </Card>
    </motion.div>
  );
};
