'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Options: 1m, 5m, 10m, 30m, Off (0)
export type RefreshInterval = 1 | 5 | 10 | 30 | 0;

interface RefreshContextType {
  refreshKey: number;
  lastUpdated: Date;
  interval: RefreshInterval;
  setInterval: (interval: RefreshInterval) => void;
  triggerRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [interval, setIntervalState] = useState<RefreshInterval>(5);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
    setLastUpdated(new Date());
  }, []);

  const handleSetInterval = useCallback((newInterval: RefreshInterval) => {
    setIntervalState(newInterval);
  }, []);

  useEffect(() => {
    if (interval === 0) return;

    const ms = interval * 60 * 1000;
    const timer = window.setInterval(() => {
      triggerRefresh();
    }, ms);

    return () => clearInterval(timer);
  }, [interval, triggerRefresh]);

  return (
    <RefreshContext.Provider
      value={{
        refreshKey,
        lastUpdated,
        interval,
        setInterval: handleSetInterval,
        triggerRefresh,
      }}
    >
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefresh() {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
}
