'use client';

import React, { useEffect, useState } from 'react';
import { PendingPOData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { Badge } from '../ui/Badge';
import { getPendingPOData } from '@/services/secondaryService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import styles from './PendingPOs.module.css';

export default function PendingPOs() {
  const [data, setData] = useState<PendingPOData | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPendingPOData();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const getPendingBadge = (days: number) => {
    if (days > 30) return <Badge variant="critical">{days} Days</Badge>;
    if (days > 14) return <Badge variant="warning">{days} Days</Badge>;
    return <Badge variant="info">{days} Days</Badge>;
  };

  return (
    <Card title="Pending Purchase Orders" className={styles.card}>
      {loading || !data ? (
        <div className={styles.loading}>
          <Skeleton height={60} borderRadius="var(--radius-md)" />
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={40} borderRadius="var(--radius-sm)" />
          ))}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Orders</span>
              <span className={styles.summaryValue}>{data.totalOrders}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Pending Value</span>
              <span className={styles.summaryValueInfo}>{formatCurrencyShort(data.totalValue)}</span>
            </div>
          </div>
          
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>PO Number</th>
                  <th>Supplier</th>
                  <th>PO Date</th>
                  <th className={styles.thPending}>Pending</th>
                  <th className={styles.thValue}>Value</th>
                </tr>
              </thead>
              <tbody>
                {data.recentPOs.map((po: { id: string; supplier: string; date: string; pendingDays: number; value: number }, index: number) => (
                  <tr key={index}>
                    <td className={styles.tdId}>{po.id}</td>
                    <td className={styles.tdSupplier}>{po.supplier}</td>
                    <td className={styles.tdDate}>{po.date}</td>
                    <td className={styles.tdPending}>{getPendingBadge(po.pendingDays)}</td>
                    <td className={styles.tdValue}>{formatCurrencyShort(po.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}
