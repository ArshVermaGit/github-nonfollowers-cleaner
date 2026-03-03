import React from 'react';
import { motion } from 'framer-motion';

interface HealthCircleProps {
  score: number;
  label: string;
}

export const HealthCircle: React.FC<HealthCircleProps> = ({ score, label }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s > 80) return 'var(--accent-green)';
    if (s > 50) return 'var(--accent-blue)';
    return 'var(--accent-red)';
  };

  const color = getColor(score);

  return (
    <div className="health-circle-wrap">
      <div className="health-circle-svg">
        <svg viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--border)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ 
              filter: `drop-shadow(0 0 5px ${color})`,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
        <div className="health-score-text">
          <span className="score-num" style={{ color }}>{Math.round(score)}%</span>
          <span className="score-label">{label}</span>
        </div>
      </div>
    </div>
  );
};
