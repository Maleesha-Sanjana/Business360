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

export async function getSalesmanData() {
  await new Promise(resolve => setTimeout(resolve, 900));
  return salesmanData;
}
