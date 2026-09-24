import { 
  rawMaterialData, 
  fastMovingData, 
  pendingPOData, 
  poAgingData, 
  pettyCashData,
  chequeOverviewData,
  pdChequesData,
  attendanceData
} from '../data/secondary';

export async function getRawMaterialData() {
  await new Promise(resolve => setTimeout(resolve, 600));
  return rawMaterialData;
}

export async function getFastMovingData() {
  await new Promise(resolve => setTimeout(resolve, 750));
  return fastMovingData;
}

export async function getPendingPOData() {
  await new Promise(resolve => setTimeout(resolve, 800));
  return pendingPOData;
}

export async function getPOAgingData() {
  await new Promise(resolve => setTimeout(resolve, 700));
  return poAgingData;
}

export async function getPettyCashData() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return pettyCashData;
}

export async function getChequeOverviewData() {
  await new Promise(resolve => setTimeout(resolve, 600));
  return chequeOverviewData;
}

export async function getPDChequesData() {
  await new Promise(resolve => setTimeout(resolve, 650));
  return pdChequesData;
}

export async function getAttendanceData() {
  await new Promise(resolve => setTimeout(resolve, 850));
  return attendanceData;
}
