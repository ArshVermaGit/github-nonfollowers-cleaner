import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserMinus, Heart, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import type { AppStats } from '../../types/github';
import { HealthCircle } from './HealthCircle';

export const StatsSection: React.FC<AppStats> = ({
  following,
  followers,
  mutual,
  nonMutual,
  fans
}) => {
  const healthScore = following > 0 ? (mutual / following) * 100 : 0;

  const stats = [
    { label: 'Following', value: following, color: 'var(--accent-blue)', icon: Users },
    { label: 'Followers', value: followers, color: '#a855f7', icon: UserCheck },
    { label: 'Mutual', value: mutual, color: 'var(--accent-green)', icon: Zap },
    { label: 'Fans', value: fans, color: '#f59e0b', icon: Heart },
    { label: 'Not Following', value: nonMutual, color: 'var(--accent-red)', icon: UserMinus },
  ];

  return (
    <div className="dashboard-stats">
      <HealthCircle score={healthScore} label="Relationship Health" />
      
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05, ease: "easeOut" }}
            style={{ height: '100%' }}
          >
            <Card className="stat-card" noHover>
              <div className="stat-icon-wrap" style={{ color: stat.color }}>
                <stat.icon size={16} />
              </div>
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value.toLocaleString() || '0'}
              </div>
              <div className="stat-name">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
