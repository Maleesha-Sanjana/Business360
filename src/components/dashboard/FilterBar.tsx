'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useFilters } from '@/providers/FilterProvider';
import styles from './FilterBar.module.css';

export default function FilterBar() {
  const pathname = usePathname();
  const { filters, setFilter } = useFilters();

  // Determine which filters to show based on the current route
  const showBranch = ['/', '/sales', '/locations', '/attendance', '/inventory', '/cheques'].includes(pathname || '/');
  const showDate = true; // Always show date range
  const showDepartment = ['/attendance'].includes(pathname || '/');
  const showSalesman = ['/sales', '/salesmen'].includes(pathname || '/');
  const showCategory = ['/inventory', '/purchasing'].includes(pathname || '/');
  const showStatus = ['/cheques'].includes(pathname || '/');
  return (
    <div className={styles.filterBar}>
      <div className={styles.iconContainer}>
        <Filter size={18} className={styles.icon} />
        <span className={styles.label}>Filters</span>
      </div>
      
      <div className={styles.filters}>
        {showBranch && (
          <div className={styles.filterGroup}>
            <label htmlFor="branch">Branch</label>
            <select id="branch" className={styles.select} value={filters.branch} onChange={(e) => setFilter('branch', e.target.value)}>
              <option value="all">All Branches</option>
              <option value="colombo">Colombo Head Office</option>
              <option value="kandy">Kandy Branch</option>
              <option value="galle">Galle Branch</option>
            </select>
          </div>
        )}

        {showDate && (
          <div className={styles.filterGroup}>
            <label htmlFor="date">Date Range</label>
            <select id="date" className={styles.select} value={filters.date} onChange={(e) => setFilter('date', e.target.value)}>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="custom">Custom...</option>
            </select>
          </div>
        )}

        {showDepartment && (
          <div className={styles.filterGroup}>
            <label htmlFor="department">Department</label>
            <select id="department" className={styles.select} value={filters.department} onChange={(e) => setFilter('department', e.target.value)}>
              <option value="all">All Departments</option>
              <option value="sales">Sales</option>
              <option value="finance">Finance</option>
              <option value="hr">HR</option>
            </select>
          </div>
        )}

        {showSalesman && (
          <div className={styles.filterGroup}>
            <label htmlFor="salesman">Salesman</label>
            <select id="salesman" className={styles.select} value={filters.salesman} onChange={(e) => setFilter('salesman', e.target.value)}>
              <option value="all">All Salesmen</option>
              <option value="kasun">Kasun Kalhara</option>
              <option value="nimal">Nimal Fernando</option>
              <option value="nuwan">Nuwan Pradeep</option>
              <option value="amila">Amila Perera</option>
            </select>
          </div>
        )}

        {showCategory && (
          <div className={styles.filterGroup}>
            <label htmlFor="category">Category</label>
            <select id="category" className={styles.select} value={filters.category} onChange={(e) => setFilter('category', e.target.value)}>
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="stationery">Stationery</option>
            </select>
          </div>
        )}

        {showStatus && (
          <div className={styles.filterGroup}>
            <label htmlFor="status">Cheque Status</label>
            <select id="status" className={styles.select} value={filters.status} onChange={(e) => setFilter('status', e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="bounced">Bounced / Returned</option>
              <option value="pending">Pending Realization</option>
              <option value="cleared">Cleared</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
