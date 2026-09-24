'use client';

import React, { useEffect, useState } from 'react';
import { AgingData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getAgingData } from '@/services/chartsService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function AgingChart() {
  const [data, setData] = useState<AgingData[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAgingData();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  // Color mapping based on aging category severity
  const getColor = (category: string) => {
    switch (category) {
      case 'Current': return 'var(--color-success)';
      case '1-30 Days': return 'var(--color-info)';
      case '31-60 Days': return '#8b5cf6'; // Purple
      case '61-90 Days': return 'var(--color-warning)';
      case '91-120 Days': return '#ea580c'; // Orange
      case '120+ Days': return 'var(--color-critical)';
      default: return 'var(--color-primary)';
    }
  };

  return (
    <Card title="Outstanding Aging Report">
      {loading ? (
        <Skeleton height={300} width="100%" />
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
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
                dataKey="category"
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
                formatter={(value: unknown) => [formatCurrencyShort(value as number), 'Amount']}
              />
              <Bar 
                dataKey="amount" 
                radius={[0, 4, 4, 0]}
                barSize={24}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.category)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
