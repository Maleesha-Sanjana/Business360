import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import AgingChart from '@/components/charts/AgingChart';
import BankBalances from '@/components/dashboard/BankBalances';
import PettyCash from '@/components/dashboard/PettyCash';
import styles from '../page.module.css';

export default function FinancePage() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      <div className={styles.bentoGrid}>
        <div className={styles.colSpan12}>
          <AgingChart />
        </div>
        <div className={styles.colSpan6}>
          <BankBalances />
        </div>
        <div className={styles.colSpan6}>
          <PettyCash />
        </div>
      </div>
    </div>
  );
}
