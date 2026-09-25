import { dashboardData } from '../data/dashboard';

export async function getDashboardData(filters?: any) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Create a deep copy
  const data = JSON.parse(JSON.stringify(dashboardData));
  
  // If filters are applied, randomize slightly to simulate different data sets
  if (filters && (filters.branch !== 'all' || filters.date !== 'month')) {
    const factor = 0.5 + (Math.random() * 0.8); // Random multiplier between 0.5 and 1.3
    data.sales.current *= factor;
    data.profit.current *= factor;
    data.stock.value *= (1.5 - factor);
  }
  
  return data;
}
