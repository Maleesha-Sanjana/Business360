'use client';

import React, { useEffect, useState } from 'react';
import { PDChequesData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getPDChequesData } from '@/services/secondaryService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import styles from './PDCheques.module.css';
import { CalendarDays, AlertCircle } from 'lucide-react';

export default function PDCheques() {
  const [data, setData] = useState<PDChequesData | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPDChequesData();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  if (loading || !data) {
    return (
      <Card title="Post-Dated Cheques" className={styles.card}>
        <div className={styles.loading}>
          <Skeleton height={100} borderRadius="var(--radius-md)" />
          <div className={styles.split}>
            <Skeleton height={80} borderRadius="var(--radius-md)" style={{ flex: 1 }} />
            <Skeleton height={80} borderRadius="var(--radius-md)" style={{ flex: 1 }} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Post-Dated Cheques" className={styles.card}>
      <div className={styles.container}>
        <div className={styles.mainTotal}>
          <div className={styles.totalHeader}>
            <span className={styles.count}>{data.total.count} Cheques</span>
          </div>
          <div className={styles.totalValue}>{formatCurrencyShort(data.total.value)}</div>
          <span className={styles.totalLabel}>Total PD Value</span>
        </div>
        
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-critical-bg)', color: 'var(--color-critical)' }}>
              <AlertCircle size={18} />
            </div>
            <div className={styles.details}>
              <span className={styles.label}>Due This Week</span>
              <span className={styles.value} style={{ color: 'var(--color-critical)' }}>
                {formatCurrencyShort(data.dueThisWeek)}
              </span>
            </div>
          </div>
          
          <div className={styles.timelineItem}>
            <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
              <CalendarDays size={18} />
            </div>
            <div className={styles.details}>
              <span className={styles.label}>Due Next Week</span>
              <span className={styles.value} style={{ color: 'var(--text-primary)' }}>
                {formatCurrencyShort(data.dueNextWeek)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
