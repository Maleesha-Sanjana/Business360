import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import LiveTicker from './LiveTicker';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <LiveTicker />
    </div>
  );
}
