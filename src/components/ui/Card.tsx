import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  noPadding?: boolean;
}

export function Card({ title, subtitle, action, children, className, noPadding = false, ...props }: CardProps) {
  return (
    <div className={clsx(styles.card, className)} {...props}>
      {(title || action) && (
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </div>
      )}
      <div className={clsx(styles.content, noPadding && styles.noPadding)}>
        {children}
      </div>
    </div>
  );
}
