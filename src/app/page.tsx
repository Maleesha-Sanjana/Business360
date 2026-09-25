import React from 'react';
import FilterBar from '@/components/dashboard/FilterBar';
import KPIGrid from '@/components/dashboard/KPIGrid';
import SalesProfitChart from '@/components/charts/SalesProfitChart';
import AgingChart from '@/components/charts/AgingChart';
import InventoryHealthCard from '@/components/dashboard/InventoryHealthCard';
import ChequeAlerts from '@/components/dashboard/ChequeAlerts';

import styles from './page.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      
      <KPIGrid />

      <div className={styles.bentoGrid}>
        <div className={styles.colSpan8}>
          <SalesProfitChart />
        </div>
        <div className={styles.colSpan4}>
          <AgingChart />
        </div>
        
        <div className={styles.colSpan6}>
          <InventoryHealthCard />
        </div>
        <div className={styles.colSpan6}>
          <ChequeAlerts />
        </div>
      </div>
    </div>
  );
}
