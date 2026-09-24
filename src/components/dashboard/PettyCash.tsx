'use client';

import React, { useEffect, useState } from 'react';
import { PettyCashData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getPettyCashData } from '@/services/secondaryService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import styles from './PettyCash.module.css';
import { Banknote } from 'lucide-react';

export default function PettyCash() {
  const [data, setData] = useState<PettyCashData | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPettyCashData();
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
      <Card title="Petty Cash" className={styles.card}>
        <div className={styles.loading}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height={40} borderRadius="var(--radius-sm)" />
          ))}
          <Skeleton height={60} borderRadius="var(--radius-md)" style={{ marginTop: 'auto' }} />
        </div>
      </Card>
    );
  }

  return (
    <Card title="Petty Cash" className={styles.card}>
      <div className={styles.container}>
        <div className={styles.list}>
          {data.locations.map((loc: { name: string; balance: number }, index: number) => (
            <div key={index} className={styles.item}>
              <span className={styles.name}>{loc.name}</span>
              <span className={styles.balance}>{formatCurrencyShort(loc.balance)}</span>
            </div>
          ))}
        </div>
        
        <div className={styles.totalSection}>
          <div className={styles.iconWrapper}>
            <Banknote size={24} color="var(--color-success)" />
          </div>
          <div className={styles.totalDetails}>
            <span className={styles.totalLabel}>Total Petty Cash</span>
            <span className={styles.totalAmount}>{formatCurrencyShort(data.total)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
