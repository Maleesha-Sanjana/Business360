'use client';

import React, { useEffect, useState } from 'react';
import { SalesmanData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { Badge } from '../ui/Badge';
import { getSalesmanData } from '@/services/chartsService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import styles from './SalesmanPerformance.module.css';
import { ArrowUpDown } from 'lucide-react';

export default function SalesmanPerformance() {
  const [data, setData] = useState<SalesmanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<'sales' | 'profit' | 'achievement'>('sales');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getSalesmanData();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const handleSort = (field: 'sales' | 'profit' | 'achievement') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortField] - b[sortField];
    }
    return b[sortField] - a[sortField];
  });

  const getAchievementVariant = (achievement: number) => {
    if (achievement >= 100) return 'success';
    if (achievement >= 90) return 'warning';
    return 'critical';
  };

  return (
    <Card title="Salesman Performance" className={styles.card}>
      {loading ? (
        <div className={styles.loading}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={40} borderRadius="var(--radius-sm)" />
          ))}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thName}>Salesman</th>
                <th 
                  className={styles.thSortable} 
                  onClick={() => handleSort('sales')}
                >
                  <div className={styles.thContent}>
                    Sales {sortField === 'sales' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th 
                  className={styles.thSortable} 
                  onClick={() => handleSort('profit')}
                >
                  <div className={styles.thContent}>
                    Profit {sortField === 'profit' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th className={styles.thTarget}>Target</th>
                <th 
                  className={styles.thSortable} 
                  onClick={() => handleSort('achievement')}
                >
                  <div className={styles.thContent}>
                    Achieved {sortField === 'achievement' && <ArrowUpDown size={12} />}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, index) => (
                <tr key={index}>
                  <td className={styles.tdName}>{row.name}</td>
                  <td className={styles.tdValue}>{formatCurrencyShort(row.sales)}</td>
                  <td className={styles.tdValue}>{formatCurrencyShort(row.profit)}</td>
                  <td className={styles.tdTarget}>{formatCurrencyShort(row.target)}</td>
                  <td className={styles.tdBadge}>
                    <Badge variant={getAchievementVariant(row.achievement)}>
                      {row.achievement}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
