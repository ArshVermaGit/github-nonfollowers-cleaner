import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserMinus, Heart, Zap } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import type { AppStats } from '../../types/github';

export const StatsSection: React.FC<AppStats> = ({
  following,
  followers,
  mutual,
  nonMutual,
  fans
}) => {
  const stats = [
    { label: 'Following', value: following, color: 'var(--accent-blue)', icon: Users },
    { label: 'Followers', value: followers, color: '#a855f7', icon: UserCheck },
    { label: 'Mutual', value: mutual, color: 'var(--accent-green)', icon: Zap },
    { label: 'Not Following', value: nonMutual, color: 'var(--accent-red)', icon: UserMinus },
    { label: 'Fans', value: fans, color: '#f59e0b', icon: Heart },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08, ease: "easeOut" }}
        >
          <Card className="stat-card" noHover>
            <div className="stat-icon-wrap" style={{ color: stat.color }}>
              <stat.icon size={14} />
            </div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value.toLocaleString() || '0'}
            </div>
            <div className="stat-name">{stat.label}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
