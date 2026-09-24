import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import SalesmanPerformance from '@/components/dashboard/SalesmanPerformance';
import styles from '../page.module.css';

export default function SalesmenPage() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      <div className={styles.bentoGrid}>
        <div className={styles.colSpan12}>
          <SalesmanPerformance />
        </div>
      </div>
    </div>
  );
}
