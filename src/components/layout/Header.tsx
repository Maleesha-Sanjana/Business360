'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useRefresh } from '@/providers/RefreshProvider';
import { Maximize, Minimize, RefreshCw, Moon, Sun, User } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lastUpdated, triggerRefresh } = useRefresh();
  
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit' // Usually nice to have seconds running
    });
  };

  const formatShortTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Business360</h1>
          <span className={styles.subtitle}>Business Intelligence Dashboard</span>
        </div>
      </div>
      
      <div className={styles.center}>
        <div className={styles.branch}>Colombo Head Office</div>
      </div>

      <div className={styles.right}>
        <div className={styles.status}>
          <div className={styles.liveIndicator}>
            <span className={styles.dot}></span>
            Live
          </div>
          <div className={styles.lastUpdated}>
            Last Updated: {formatShortTime(lastUpdated)}
          </div>
        </div>

        <div className={styles.datetime}>
          <div className={styles.date}>{mounted ? formatDate(time) : ''}</div>
          <div className={styles.time}>{mounted ? formatTime(time) : ''}</div>
        </div>

        <div className={styles.actions}>
          <button className={styles.iconButton} onClick={triggerRefresh} title="Refresh Data">
            <RefreshCw size={20} />
          </button>
          <button className={styles.iconButton} onClick={toggleFullscreen} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
          <button className={styles.iconButton} onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className={styles.iconButton} title="Profile">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
