import { salesProfitData, agingData, bankBalancesData, purchasingData, salesmanData } from '../data/charts';

export async function getSalesProfitData() {
  await new Promise(resolve => setTimeout(resolve, 800));
  return salesProfitData;
}

export async function getAgingData() {
  await new Promise(resolve => setTimeout(resolve, 700));
  return agingData;
}

export async function getBankBalancesData() {
  await new Promise(resolve => setTimeout(resolve, 600));
  return bankBalancesData;
}

export async function getPurchasingData() {
  await new Promise(resolve => setTimeout(resolve, 800));
  return purchasingData;
}

export async function getSalesmanData(filters?: any) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const data = JSON.parse(JSON.stringify(salesmanData));
  
  if (filters && (filters.branch !== 'all' || filters.date !== 'month' || filters.salesman !== 'all')) {
    data.forEach((row: any) => {
      const factor = 0.4 + (Math.random() * 0.9); // Randomize
      row.sales *= factor;
      row.achievement = Math.round(row.achievement * factor);
      row.profit *= factor;
    });
  }
  
  return data;
}
