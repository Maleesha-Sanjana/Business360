'use client';

import React, { useEffect, useState } from 'react';
import { PurchasingData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getPurchasingData } from '@/services/chartsService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function PurchasingChart() {
  const [data, setData] = useState<PurchasingData[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPurchasingData();
        // Sort highest to lowest as requested
        setData([...result].sort((a, b) => b.value - a.value));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  return (
    <Card title="Purchasing by Department">
      {loading ? (
        <Skeleton height={300} width="100%" />
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border-color)" />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                tickFormatter={(value) => formatCurrencyShort(value)}
              />
              <YAxis 
                dataKey="department"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip 
                cursor={{ fill: 'var(--bg-surface-hover)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
                formatter={(value: unknown) => [formatCurrencyShort(value as number), 'Value']}
              />
              <Bar 
                dataKey="value" 
                fill="var(--color-info)"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
