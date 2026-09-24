'use client';

import React, { useEffect, useState } from 'react';
import { RawMaterialData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getRawMaterialData } from '@/services/secondaryService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort, formatNumber } from '@/utils/formatters';
import styles from './RawMaterialStock.module.css';

export default function RawMaterialStock() {
  const [data, setData] = useState<RawMaterialData | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getRawMaterialData();
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
      <Card title="Raw Material Stock" className={styles.card}>
        <div className={styles.loading}>
          <Skeleton height={80} borderRadius="var(--radius-md)" />
          <div className={styles.split}>
            <Skeleton height={60} borderRadius="var(--radius-md)" style={{ flex: 1 }} />
            <Skeleton height={60} borderRadius="var(--radius-md)" style={{ flex: 1 }} />
            <Skeleton height={60} borderRadius="var(--radius-md)" style={{ flex: 1 }} />
          </div>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={20} borderRadius="var(--radius-sm)" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card title="Raw Material Stock" className={styles.card}>
      <div className={styles.container}>
        <div className={styles.mainTotal}>
          <span className={styles.totalLabel}>Total Stock Value</span>
          <span className={styles.totalValue}>{formatCurrencyShort(data.totalValue)}</span>
        </div>
        
        <div className={styles.metricsRow}>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{formatNumber(data.items)}</span>
            <span className={styles.metricLabel}>Total Items</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue} style={{ color: 'var(--color-warning)' }}>{data.lowStock}</span>
            <span className={styles.metricLabel}>Low Stock</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue} style={{ color: 'var(--color-critical)' }}>{data.outOfStock}</span>
            <span className={styles.metricLabel}>Out of Stock</span>
          </div>
        </div>
        
        <div className={styles.categories}>
          <h4 className={styles.catTitle}>Category Breakdown</h4>
          {data.categories.map((cat: { name: string; value: number }, index: number) => (
            <div key={index} className={styles.categoryItem}>
              <span className={styles.catName}>{cat.name}</span>
              <span className={styles.catValue}>{formatCurrencyShort(cat.value)}</span>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${(cat.value / data.totalValue) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
