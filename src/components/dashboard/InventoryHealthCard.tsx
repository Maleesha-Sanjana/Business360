'use client';

import React from 'react';
import { Card } from '../ui/Card';
import styles from './InventoryHealthCard.module.css';
import { AlertTriangle, Clock } from 'lucide-react';
import { formatCurrencyShort } from '@/utils/formatters';

const SLOW_MOVING_DATA = [
  { id: 'ITM-901', name: 'Legacy Server Racks', daysSinceSale: 145, value: 450000 },
  { id: 'ITM-432', name: 'Premium Office Chairs', daysSinceSale: 120, value: 280000 },
  { id: 'ITM-112', name: 'Old Gen Monitors', daysSinceSale: 95, value: 150000 },
  { id: 'ITM-555', name: 'Spare Cables Bulk', daysSinceSale: 88, value: 45000 },
];

export default function InventoryHealthCard() {
  const totalTiedUpValue = SLOW_MOVING_DATA.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card 
      title="Inventory Health" 
      subtitle="Dead & Slow Moving Stock Warning" 
      className={styles.cardWrapper}
    >
      <div className={styles.healthSummary}>
        <div className={styles.warningIconWrapper}>
          <AlertTriangle size={24} className={styles.warningIcon} />
        </div>
        <div className={styles.summaryInfo}>
          <span className={styles.summaryLabel}>Capital Tied Up</span>
          <span className={styles.summaryValue}>Rs. {formatCurrencyShort(totalTiedUpValue)}</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th className={styles.alignRight}>Idle Days</th>
              <th className={styles.alignRight}>Value</th>
            </tr>
          </thead>
          <tbody>
            {SLOW_MOVING_DATA.map((item) => (
              <tr key={item.id} className={item.daysSinceSale > 100 ? styles.criticalRow : ''}>
                <td>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemId}>{item.id}</span>
                  </div>
                </td>
                <td className={styles.alignRight}>
                  <div className={styles.daysWrapper}>
                    <Clock size={12} />
                    <span>{item.daysSinceSale}</span>
                  </div>
                </td>
                <td className={styles.alignRight}>
                  <span className={styles.itemValue}>{formatCurrencyShort(item.value)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
