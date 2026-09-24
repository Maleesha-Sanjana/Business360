import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './KPICard.module.css';

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: number | string;
    direction?: 'up' | 'down' | 'neutral';
    label?: string;
  };
  subValue?: string;
  subLabel?: string;
}

export default function KPICard({ title, value, trend, subValue, subLabel }: KPICardProps) {
  return (
    <Card className={styles.kpiCard}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{value}</div>
      
      <div className={styles.footer}>
        {trend && (
          <div className={`${styles.trend} ${styles[trend.direction || 'neutral']}`}>
            {trend.direction === 'up' && <TrendingUp size={14} />}
            {trend.direction === 'down' && <TrendingDown size={14} />}
            {trend.direction === 'neutral' && <Minus size={14} />}
            <span>
              {typeof trend.value === 'number' && trend.direction !== 'neutral' ? 
                Math.abs(trend.value) + '%' : trend.value}
            </span>
            {trend.label && <span className={styles.trendLabel}>{trend.label}</span>}
          </div>
        )}
        
        {subValue && (
          <div className={styles.subInfo}>
            <span className={styles.subLabel}>{subLabel}</span>
            <span className={styles.subValue}>{subValue}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
