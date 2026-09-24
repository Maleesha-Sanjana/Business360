'use client';

import React, { useEffect, useState } from 'react';
import { ChequeOverviewData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getChequeOverviewData } from '@/services/secondaryService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import styles from './ChequeOverview.module.css';
import { CheckCircle2, Clock, XCircle, FileInput } from 'lucide-react';

export default function ChequeOverview() {
  const [data, setData] = useState<ChequeOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getChequeOverviewData();
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
      <Card title="Cheque Overview" className={styles.card}>
        <div className={styles.grid}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={80} borderRadius="var(--radius-md)" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card title="Cheque Overview" className={styles.card}>
      <div className={styles.grid}>
        <div className={styles.item}>
          <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-primary)' }}>
            <FileInput size={20} color="white" />
          </div>
          <div className={styles.details}>
            <span className={styles.label}>In Hand ({data.inHand.count})</span>
            <span className={styles.value}>{formatCurrencyShort(data.inHand.value)}</span>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-warning)' }}>
            <Clock size={20} color="white" />
          </div>
          <div className={styles.details}>
            <span className={styles.label}>Pending ({data.pending.count})</span>
            <span className={styles.value}>{formatCurrencyShort(data.pending.value)}</span>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-success)' }}>
            <CheckCircle2 size={20} color="white" />
          </div>
          <div className={styles.details}>
            <span className={styles.label}>Cleared ({data.cleared.count})</span>
            <span className={styles.value}>{formatCurrencyShort(data.cleared.value)}</span>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--color-critical)' }}>
            <XCircle size={20} color="white" />
          </div>
          <div className={styles.details}>
            <span className={styles.label}>Returned ({data.returned.count})</span>
            <span className={styles.value} style={{ color: 'var(--color-critical)' }}>
              {formatCurrencyShort(data.returned.value)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
