'use client';

import React, { useEffect, useState } from 'react';
import { BankBalanceData } from '@/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getBankBalancesData } from '@/services/chartsService';
import { useRefresh } from '@/providers/RefreshProvider';
import { formatCurrencyShort } from '@/utils/formatters';
import styles from './BankBalances.module.css';
import { Building2 } from 'lucide-react';

export default function BankBalances() {
  const [data, setData] = useState<BankBalanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getBankBalancesData();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const total = data.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <Card title="Bank Balances" className={styles.card}>
      {loading ? (
        <div className={styles.loading}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height={60} borderRadius="var(--radius-md)" />
          ))}
          <Skeleton height={80} borderRadius="var(--radius-md)" style={{ marginTop: 'auto' }} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.list}>
            {data.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.bankInfo}>
                  <div className={styles.iconWrapper}>
                    <Building2 size={18} />
                  </div>
                  <div className={styles.details}>
                    <span className={styles.bankName}>{item.bank}</span>
                    <span className={styles.account}>{item.account}</span>
                  </div>
                </div>
                <div className={styles.balance}>{formatCurrencyShort(item.balance)}</div>
              </div>
            ))}
          </div>
          
          <div className={styles.totalSection}>
            <span className={styles.totalLabel}>Total Balance</span>
            <span className={styles.totalAmount}>{formatCurrencyShort(total)}</span>
          </div>
        </div>
      )}
    </Card>
  );
}
