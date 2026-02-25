import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import type { UserWithState } from '../../types/github';

interface UserItemProps {
  user: UserWithState;
  onAction: (login: string) => void;
  actionLabel: string;
  badgeLabel: string;
  badgeType: 'danger' | 'success';
  index: number;
}

export const UserItem: React.FC<UserItemProps> = ({
  user,
  onAction,
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
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
    >
      <Card className={clsx("user-item-card", isDone && "done")}>
        <div className="user-avatar-wrap">
          <img src={`${user.avatar_url}&s=80`} alt={user.login} className="user-avatar" loading="lazy" />
        </div>

        <div className="user-details">
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noreferrer" 
            className="user-login-link"
          >
            @{user.login}
            <ExternalLink size={12} />
          </a>
          {user.name && <div className="user-full-name">{user.name}</div>}
        </div>

        <Badge variant={isDone ? 'done' : badgeType}>
          {isDone ? `✓ ${badgeType === 'danger' ? 'unfollowed' : 'following'}` : badgeLabel}
        </Badge>

        <Button
          onClick={() => onAction(user.login)}
          variant={isDone ? 'primary' : isError ? 'primary' : badgeType === 'success' ? 'success' : 'danger'}
          loading={isLoading}
          disabled={isDone}
          className={clsx(
            isDone && "action-done",
            isError && "action-retry"
          )}
        >
          {isDone ? <Check size={14} /> : isError ? <XCircle size={14} /> : actionLabel}
        </Button>
      </Card>
    </motion.div>
  );
};

// Helper for conditional classes since clsx is in atomic components but not here
import { clsx } from 'clsx';
