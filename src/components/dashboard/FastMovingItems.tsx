'use client';

import React, { useEffect, useState } from 'react';
import { FastMovingData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getFastMovingData } from '@/services/secondaryService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort, formatNumber } from '@/utils/formatters';
import styles from './FastMovingItems.module.css';

export default function FastMovingItems() {
  const [data, setData] = useState<FastMovingData[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();
  const [period, setPeriod] = useState('30days');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getFastMovingData();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey, period]);

  const action = (
    <select 
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
      className={styles.select}
    >
      <option value="today">Today</option>
      <option value="7days">7 Days</option>
      <option value="30days">30 Days</option>
      <option value="90days">90 Days</option>
    </select>
  );

  return (
    <Card title="Fast Moving Items" action={action} className={styles.card}>
      {loading ? (
        <div className={styles.loading}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={40} borderRadius="var(--radius-sm)" />
          ))}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thRank}>Rank</th>
                <th>Product</th>
                <th className={styles.thQuantity}>Quantity Sold</th>
                <th className={styles.thValue}>Sales Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className={styles.tdRank}>
                    <span className={styles.rankBadge}>
                      {item.rank.toString().padStart(2, '0')}
                    </span>
                  </td>
                  <td className={styles.tdProduct}>{item.product}</td>
                  <td className={styles.tdQuantity}>{formatNumber(item.quantity)}</td>
                  <td className={styles.tdValue}>{formatCurrencyShort(item.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
