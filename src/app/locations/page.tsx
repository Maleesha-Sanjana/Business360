'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import FilterBar from '@/components/dashboard/FilterBar';
import styles from '../page.module.css';

// Leaflet uses window, so it must be dynamically imported on the client-side
const DynamicLocationsMap = dynamic(
  () => import('@/components/dashboard/LocationsMap'),
  { 
    ssr: false,
    loading: () => (
      <div style={{ height: '80vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading interactive map...</p>
      </div>
    )
  }
);

export default function LocationsPage() {
  return (
    <div className={styles.dashboard}>
      <FilterBar />
      
      <div style={{ marginTop: '24px' }}>
        <DynamicLocationsMap />
      </div>
    </div>
  );
}
