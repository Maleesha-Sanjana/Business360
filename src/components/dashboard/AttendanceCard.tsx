'use client';

import React, { useEffect, useState } from 'react';
import { AttendanceData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getAttendanceData } from '@/services/secondaryService';
import { useRefresh } from '@/providers/RefreshProvider';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import styles from './AttendanceCard.module.css';

export default function AttendanceCard() {
  const [data, setData] = useState<AttendanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAttendanceData();
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
      <Card title="Employee Attendance">
        <div className={styles.loading}>
          <Skeleton height={200} borderRadius="var(--radius-md)" />
        </div>
      </Card>
    );
  }

  const chartData = [
    { name: 'Present', value: data.present, color: 'var(--color-success)' },
    { name: 'Absent', value: data.absent, color: 'var(--color-critical)' }
  ];

  return (
    <Card title="Employee Attendance" className={styles.card}>
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.chartCenter}>
            <span className={styles.rateValue}>{data.rate}%</span>
            <span className={styles.rateLabel}>Rate</span>
          </div>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Employees</span>
            <span className={styles.statValue}>{data.total}</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statRow}>
            <div className={styles.statSmall}>
              <div className={styles.dot} style={{ backgroundColor: 'var(--color-success)' }}></div>
              <span className={styles.statSmallLabel}>Present</span>
              <span className={styles.statSmallValue}>{data.present}</span>
            </div>
            <div className={styles.statSmall}>
              <div className={styles.dot} style={{ backgroundColor: 'var(--color-critical)' }}></div>
              <span className={styles.statSmallLabel}>Absent</span>
              <span className={styles.statSmallValue}>{data.absent}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
