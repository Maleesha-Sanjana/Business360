import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import RawMaterialStock from '@/components/dashboard/RawMaterialStock';
import FastMovingItems from '@/components/dashboard/FastMovingItems';
import styles from '../page.module.css';

export default function InventoryPage() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      <div className={styles.bentoGrid}>
        <div className={styles.colSpan6}>
          <RawMaterialStock />
        </div>
        <div className={styles.colSpan6}>
          <FastMovingItems />
        </div>
      </div>
    </div>
  );
}
