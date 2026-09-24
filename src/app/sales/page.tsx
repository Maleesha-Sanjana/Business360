import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import SalesProfitChart from '@/components/charts/SalesProfitChart';
import styles from '../page.module.css';

export default function SalesPage() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      <div className={styles.bentoGrid}>
        <div className={styles.colSpan12}>
          <SalesProfitChart />
        </div>
      </div>
    </div>
  );
}
