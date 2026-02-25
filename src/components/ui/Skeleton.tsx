import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  width, 
  height, 
  circle 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={clsx(
        "bg-white/5 animate-pulse",
        circle ? "rounded-full" : "rounded-md",
        className
      )}
      style={{ width, height }}
    />
  );
};

export const UserItemSkeleton = () => (
  <div className="user-item-card skeleton-item">
    <Skeleton circle width="3.5rem" height="3.5rem" />
    <div className="user-details">
      <Skeleton width="120px" height="1.25rem" className="mb-2" />
      <Skeleton width="180px" height="0.875rem" />
    </div>
    <Skeleton width="80px" height="1.5rem" />
    <Skeleton width="100px" height="2.5rem" />
  </div>
);

export const StatCardSkeleton = () => (
  <div className="premium-card stat-card skeleton-stat">
     <Skeleton circle width="28px" height="28px" className="mb-2" />
     <Skeleton width="60px" height="2.5rem" className="mb-2" />
     <Skeleton width="80px" height="10px" />
  </div>
);
