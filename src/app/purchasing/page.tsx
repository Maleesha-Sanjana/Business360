import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import PurchasingChart from '@/components/dashboard/PurchasingChart';
import PendingPOs from '@/components/dashboard/PendingPOs';
import POPendingDate from '@/components/dashboard/POPendingDate';
import styles from '../page.module.css';

export default function PurchasingPage() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      <div className={styles.bentoGrid}>
        <div className={styles.colSpan12}>
          <PurchasingChart />
        </div>
        <div className={styles.colSpan6}>
          <PendingPOs />
        </div>
        <div className={styles.colSpan6}>
          <POPendingDate />
        </div>
      </div>
    </div>
  );
}
