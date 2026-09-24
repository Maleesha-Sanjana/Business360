'use client';

import React, { useEffect, useState } from 'react';
import { SalesProfitData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getSalesProfitData } from '@/services/chartsService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function SalesProfitChart() {
  const [data, setData] = useState<SalesProfitData[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();
  const [period, setPeriod] = useState('daily');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getSalesProfitData();
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
      style={{
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        fontSize: '12px'
      }}
    >
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  );

  return (
    <Card title="Sales & Profit Trend" action={action}>
      {loading ? (
        <Skeleton height={300} width="100%" />
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                tickFormatter={(value) => formatCurrencyShort(value)}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                tickFormatter={(value) => formatCurrencyShort(value)}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
                formatter={(value: unknown) => formatCurrencyShort(value as number)}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="sales" 
                name="Sales"
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="profit" 
                name="Profit"
                stroke="var(--color-success)" 
                strokeWidth={3}
                dot={{ r: 4, fill: 'var(--color-success)', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
