'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TrendingUp, 
  PieChart, 
  Package, 
  ShoppingCart, 
  FileText, 
  Users, 
  UserCheck, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Sales', path: '/sales', icon: TrendingUp },
  { name: 'Finance', path: '/finance', icon: PieChart },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Purchasing', path: '/purchasing', icon: ShoppingCart },
  { name: 'Cheques', path: '/cheques', icon: FileText },
  { name: 'Attendance', path: '/attendance', icon: Users },
  { name: 'Salesmen', path: '/salesmen', icon: UserCheck },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={clsx(styles.sidebar, isCollapsed && styles.collapsed)}>
      <div className={styles.toggleContainer}>
        <button 
          className={styles.toggleButton} 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className={styles.nav}>
        <div className={styles.menuGroup}>
          <span className={styles.groupLabel}>Main</span>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={clsx(styles.link, isActive && styles.active)}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon size={20} className={styles.icon} />
                {!isCollapsed && <span className={styles.label}>{item.name}</span>}
              </Link>
            );
          })}
        </div>

        <div className={styles.menuGroup} style={{ marginTop: 'auto' }}>
          <Link 
            href="/settings"
            className={clsx(styles.link, pathname === '/settings' && styles.active)}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Settings size={20} className={styles.icon} />
            {!isCollapsed && <span className={styles.label}>Settings</span>}
          </Link>
        </div>
      </nav>
    </aside>
  );
}
