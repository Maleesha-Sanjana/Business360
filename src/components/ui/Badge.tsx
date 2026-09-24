import React from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'success' | 'warning' | 'critical' | 'info' | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = 'neutral', children, className, ...props }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant], className)} {...props}>
      {children}
    </span>
  );
}
