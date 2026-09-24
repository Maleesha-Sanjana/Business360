import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import AttendanceCard from '@/components/dashboard/AttendanceCard';
import styles from '../page.module.css';

export default function AttendancePage() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      <div className={styles.bentoGrid}>
        <div className={styles.colSpan12}>
          <AttendanceCard />
        </div>
      </div>
    </div>
  );
}
