'use client';

import React from 'react';
import { AlertCircle, TrendingUp, Trophy, PackageX } from 'lucide-react';
import styles from './LiveTicker.module.css';

const MOCK_TICKER_DATA = [
  { id: 1, text: "Kasun Kalhara just closed a Rs. 500K deal!", icon: <Trophy size={16} className={styles.iconSuccess} /> },
  { id: 2, text: "Low stock alert: Raw Material A (Less than 50 units)", icon: <PackageX size={16} className={styles.iconCritical} /> },
  { id: 3, text: "Colombo branch sales are up 12% compared to last week", icon: <TrendingUp size={16} className={styles.iconPrimary} /> },
  { id: 4, text: "Pending PO approval required for Packaging Supplies", icon: <AlertCircle size={16} className={styles.iconWarning} /> },
  { id: 5, text: "Nimal Fernando hit 100% of his monthly target!", icon: <Trophy size={16} className={styles.iconSuccess} /> },
];

export default function LiveTicker() {
  return (
    <div className={styles.tickerContainer}>
      <div className={styles.tickerLabel}>
        <span className={styles.liveDot}></span>
        LIVE
      </div>
      <div className={styles.tickerTrack}>
        <div className={styles.tickerContent}>
          {MOCK_TICKER_DATA.map((item) => (
            <div key={`first-${item.id}`} className={styles.tickerItem}>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {MOCK_TICKER_DATA.map((item) => (
            <div key={`second-${item.id}`} className={styles.tickerItem}>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
