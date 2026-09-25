'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Filters = {
  branch: string;
  date: string;
  department: string;
  salesman: string;
  category: string;
  status: string;
};

type FilterContextType = {
  filters: Filters;
  setFilter: (key: keyof Filters, value: string) => void;
};

const defaultFilters: Filters = {
  branch: 'all',
  date: 'month',
  department: 'all',
  salesman: 'all',
  category: 'all',
  status: 'all',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
