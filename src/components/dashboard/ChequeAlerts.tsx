'use client';

import React from 'react';
import { Card } from '../ui/Card';
import styles from './ChequeAlerts.module.css';
import { XCircle, AlertOctagon } from 'lucide-react';
import { formatCurrencyShort } from '@/utils/formatters';

const BOUNCED_CHEQUES = [
  { id: 'CHQ-88912', customer: 'ABC Trading Ltd', amount: 1250000, date: '2026-09-24', status: 'Action Required' },
  { id: 'CHQ-33104', customer: 'Global Imports', amount: 450000, date: '2026-09-22', status: 'Legal Notice Sent' },
];

export default function ChequeAlerts() {
  const totalBounced = BOUNCED_CHEQUES.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Card 
      title="Bounced Cheque Alerts" 
      subtitle="Critical payment failures" 
      className={styles.cardWrapper}
    >
      <div className={styles.alertHeader}>
        <div className={styles.iconPulse}>
          <AlertOctagon size={28} />
        </div>
        <div className={styles.alertSummary}>
          <span className={styles.alertTitle}>Returned Cheques</span>
          <span className={styles.alertAmount}>Rs. {formatCurrencyShort(totalBounced)}</span>
        </div>
      </div>

      <div className={styles.alertList}>
        {BOUNCED_CHEQUES.map((chq) => (
          <div key={chq.id} className={styles.alertItem}>
            <div className={styles.itemHeader}>
              <span className={styles.customerName}>{chq.customer}</span>
              <span className={styles.chqAmount}>Rs. {formatCurrencyShort(chq.amount)}</span>
            </div>
            <div className={styles.itemDetails}>
              <span className={styles.chqId}>#{chq.id}</span>
              <span className={styles.chqDate}>Returned: {chq.date}</span>
            </div>
            <div className={styles.actionStatus}>
              <XCircle size={14} className={styles.statusIcon} />
              <span>{chq.status}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
