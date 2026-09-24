'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getPOAgingData } from '@/services/secondaryService';
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

import { POAgingData } from '@/types';

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; payload: { count: number } }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        padding: '12px',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</p>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
          POs: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{payload[0].payload.count}</span>
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Value: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrencyShort(payload[0].value)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function POPendingDate() {
  const [data, setData] = useState<POAgingData[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPOAgingData();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const getColor = (category: string) => {
    switch (category) {
      case '0-7 Days': return 'var(--color-success)';
      case '8-15 Days': return 'var(--color-info)';
      case '16-30 Days': return '#8b5cf6'; // Purple
      case '31-60 Days': return 'var(--color-warning)';
      case '60+ Days': return 'var(--color-critical)';
      default: return 'var(--color-primary)';
    }
  };

  return (
    <Card title="PO Pending by Date">
      {loading ? (
        <Skeleton height={250} width="100%" />
      ) : (
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis 
                dataKey="category" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
                tickFormatter={(value) => formatCurrencyShort(value)}
              />
              <Tooltip cursor={{ fill: 'var(--bg-surface-hover)' }} content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                barSize={32}
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
