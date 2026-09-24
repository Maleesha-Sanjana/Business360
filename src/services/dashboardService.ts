import { dashboardData } from '../data/dashboard';

export async function getDashboardData() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return dashboardData;
}
