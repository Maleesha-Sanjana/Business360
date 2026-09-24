'use client';

import React, { useEffect, useState } from 'react';
import KPICard from './KPICard';
import { DashboardData } from '@/types';
import { Skeleton } from '../ui/Skeleton';
import { getDashboardData } from '@/services/dashboardService';
import { formatCurrencyShort, formatNumber } from '@/utils/formatters';
import { useRefresh } from '@/providers/RefreshProvider';
import styles from './KPIGrid.module.css';

export default function KPIGrid() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getDashboardData();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load KPI data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryButton} onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className={styles.grid}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={140} borderRadius="var(--radius-lg)" />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      <KPICard 
        title="Current Sales" 
        value={formatCurrencyShort(data.sales.current)}
        trend={{ 
          value: data.sales.trend, 
          direction: data.sales.trend >= 0 ? 'up' : 'down',
          label: 'vs previous period'
        }}
      />
      <KPICard 
        title="Current Profit" 
        value={formatCurrencyShort(data.profit.current)}
        subLabel="Profit Margin"
        subValue={`${data.profit.margin}%`}
      />
      <KPICard 
        title="Stock Value" 
        value={formatCurrencyShort(data.stock.value)}
        subLabel="Items"
        subValue={formatNumber(data.stock.itemsCount)}
      />
      <KPICard 
        title="Customer Outstanding" 
        value={formatCurrencyShort(data.outstanding.total)}
        trend={{
          value: 'Overdue',
          direction: 'neutral'
        }}
        subLabel="Overdue"
        subValue={formatCurrencyShort(data.outstanding.overdue)}
      />
      <KPICard 
        title="Creditors" 
        value={formatCurrencyShort(data.creditors.total)}
        subLabel="Creditors"
        subValue={data.creditors.count.toString()}
      />
    </div>
  );
}
