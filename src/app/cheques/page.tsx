import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import ChequeOverview from '@/components/dashboard/ChequeOverview';
import PDCheques from '@/components/dashboard/PDCheques';
import styles from '../page.module.css';

export default function ChequesPage() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      <div className={styles.bentoGrid}>
        <div className={styles.colSpan6}>
          <ChequeOverview />
        </div>
        <div className={styles.colSpan6}>
          <PDCheques />
        </div>
      </div>
    </div>
  );
}
