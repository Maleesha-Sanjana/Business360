'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import styles from './FilterBar.module.css';

export default function FilterBar() {
  return (
    <div className={styles.filterBar}>
      <div className={styles.iconContainer}>
        <Filter size={18} className={styles.icon} />
        <span className={styles.label}>Filters</span>
      </div>
      
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="branch">Branch</label>
          <select id="branch" className={styles.select} defaultValue="all">
            <option value="all">All Branches</option>
            <option value="colombo">Colombo Head Office</option>
            <option value="kandy">Kandy Branch</option>
            <option value="galle">Galle Branch</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="date">Date Range</label>
          <select id="date" className={styles.select} defaultValue="month">
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="custom">Custom...</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="department">Department</label>
          <select id="department" className={styles.select} defaultValue="all">
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="finance">Finance</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="salesman">Salesman</label>
          <select id="salesman" className={styles.select} defaultValue="all">
            <option value="all">All Salesmen</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
          </select>
        </div>
      </div>
    </div>
  );
}
