'use client';

import React, { useEffect, useState } from 'react';
import { SalesmanData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getSalesmanData } from '@/services/chartsService';
import { useRefresh } from '@/providers/RefreshProvider';
import { useFilters } from '@/providers/FilterProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import confetti from 'canvas-confetti';
import styles from './SalesmanPerformance.module.css';
import { Trophy, Medal, Award } from 'lucide-react';
import clsx from 'clsx';

export default function SalesmanPerformance() {
  const [data, setData] = useState<SalesmanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<'sales' | 'achievement'>('achievement');
  const [prevPositions, setPrevPositions] = useState<Record<string, number>>({});
  const [trends, setTrends] = useState<Record<string, 'up' | 'down' | 'same'>>({});
  const { refreshKey } = useRefresh();
  const { filters } = useFilters();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getSalesmanData(filters);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey, filters]);

  const sortedData = [...data].sort((a, b) => b[sortField] - a[sortField]);
  
  useEffect(() => {
    if (data.length === 0) return;
    
    const currentPositions: Record<string, number> = {};
    sortedData.forEach((row, index) => {
      currentPositions[row.name] = index;
    });
    
    if (Object.keys(prevPositions).length > 0) {
      const newTrends: Record<string, 'up' | 'down' | 'same'> = {};
      sortedData.forEach((row, index) => {
        const prev = prevPositions[row.name];
        if (prev !== undefined) {
          if (prev > index) newTrends[row.name] = 'up';
          else if (prev < index) newTrends[row.name] = 'down';
          else newTrends[row.name] = 'same';
        }
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTrends(newTrends);
      
      // Trigger confetti if someone moves into 1st place
      const firstPlaceName = sortedData[0]?.name;
      if (prevPositions[firstPlaceName] > 0) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#22c55e', '#3b82f6']
        });
      }
      
      // Reset animations after they play
      setTimeout(() => {
        setTrends({});
      }, 1500);
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrevPositions(currentPositions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortField, data]);

  const top3 = sortedData.slice(0, 3);
  const others = sortedData.slice(3);

  const getRankClass = (index: number) => {
    if (index === 0) return styles.rank1;
    if (index === 1) return styles.rank2;
    if (index === 2) return styles.rank3;
    return '';
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy size={18} />;
    if (index === 1) return <Medal size={18} />;
    if (index === 2) return <Award size={18} />;
    return index + 1;
  };

  const getProgressClass = (achievement: number) => {
    if (achievement >= 100) return styles.progressSuccess;
    if (achievement >= 80) return styles.progressWarning;
    return styles.progressCritical;
  };

  const getAchClass = (achievement: number) => {
    if (achievement >= 100) return styles.achSuccess;
    if (achievement >= 80) return styles.achWarning;
    return styles.achCritical;
  };

  return (
    <Card title="Salesman Leaderboard" className={styles.card}>
      {loading ? (
        <div className={styles.loading}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={80} borderRadius="var(--radius-md)" />
          ))}
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>
              Top performers driving our business
            </span>
            <div className={styles.sortControls}>
              <button 
                className={clsx(styles.sortBtn, sortField === 'achievement' && styles.active)}
                onClick={() => setSortField('achievement')}
              >
                By Target %
              </button>
              <button 
                className={clsx(styles.sortBtn, sortField === 'sales' && styles.active)}
                onClick={() => setSortField('sales')}
              >
                By Sales
              </button>
            </div>
          </div>
          
          <div>
            {top3.length > 0 && (
              <div className={styles.podiumContainer}>
                {top3.map((row, index) => {
                  const trend = trends[row.name];
                  const trendClass = trend === 'up' ? styles.trendUp : trend === 'down' ? styles.trendDown : '';
                  return (
                    <div 
                      key={row.name} 
                      className={clsx(styles.podiumCard, styles[`podiumCard${index + 1}`], trendClass)}
                    >
                      <div className={clsx(styles.podiumRank, getRankClass(index))}>
                      {getRankIcon(index)}
                    </div>
                    
                    <div className={styles.podiumCardContent}>
                      <img 
                        src={`https://i.pravatar.cc/150?u=${encodeURIComponent(row.name)}`} 
                        alt={row.name}
                        className={styles.podiumAvatar}
                      />
                      <span className={styles.podiumName}>{row.name}</span>
                      <span className={clsx(styles.podiumAchievement, getAchClass(row.achievement))}>
                        {row.achievement}%
                      </span>
                      
                      <div className={styles.progressTrack} style={{ margin: '8px 0', width: '80%' }}>
                        <div 
                          className={clsx(styles.progressBar, getProgressClass(row.achievement))} 
                          style={{ width: `${Math.min(row.achievement, 100)}%` }} 
                        />
                      </div>
                      
                      <div className={styles.podiumMetrics}>
                        <span>Sales: <span className={styles.metricValue}>{formatCurrencyShort(row.sales)}</span></span>
                        <span>Target: <span className={styles.metricValue}>{formatCurrencyShort(row.target)}</span></span>
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>
            )}

            <div className={styles.list}>
              {others.map((row, index) => {
                const trend = trends[row.name];
                const trendClass = trend === 'up' ? styles.trendUp : trend === 'down' ? styles.trendDown : '';
                return (
                  <div 
                    key={row.name} 
                    className={clsx(styles.row, trendClass)}
                  >
                    <div className={clsx(styles.rank, getRankClass(index + 3))}>
                    {getRankIcon(index + 3)}
                  </div>
                  
                  <div className={styles.info}>
                    <div className={styles.nameRow}>
                      <div className={styles.listAvatarWrapper}>
                        <img 
                          src={`https://i.pravatar.cc/150?u=${encodeURIComponent(row.name)}`} 
                          alt={row.name}
                          className={styles.listAvatar}
                        />
                        <span className={styles.name}>{row.name}</span>
                      </div>
                      <span className={clsx(styles.achievement, getAchClass(row.achievement))}>
                        {row.achievement}%
                      </span>
                    </div>
                    
                    <div className={styles.progressTrack}>
                      <div 
                        className={clsx(styles.progressBar, getProgressClass(row.achievement))} 
                        style={{ width: `${Math.min(row.achievement, 100)}%` }} 
                      />
                    </div>
                    
                    <div className={styles.metrics}>
                      <span>Sales: <span className={styles.metricValue}>{formatCurrencyShort(row.sales)}</span></span>
                      <span>Target: <span className={styles.metricValue}>{formatCurrencyShort(row.target)}</span></span>
                      <span>Profit: <span className={styles.metricValue}>{formatCurrencyShort(row.profit)}</span></span>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
