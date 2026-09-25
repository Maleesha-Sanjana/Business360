export interface DashboardData {
  sales: { current: number; previous: number; trend: number };
  profit: { current: number; margin: number };
  stock: { value: number; itemsCount: number };
  outstanding: { total: number; overdue: number };
  creditors: { total: number; count: number };
}

export interface SalesProfitData {
  date: string;
  sales: number;
  profit: number;
}

export interface AgingData {
  category: string;
  amount: number;
}

export interface BankBalanceData {
  bank: string;
  balance: number;
  account: string;
}

export interface PurchasingData {
  department: string;
  value: number;
}

export interface SalesmanData {
  name: string;
  sales: number;
  profit: number;
  target: number;
  achievement: number;
}

export interface RawMaterialData {
  totalValue: number;
  items: number;
  lowStock: number;
  outOfStock: number;
  categories: { name: string; value: number }[];
}

export interface FastMovingData {
  rank: number;
  product: string;
  quantity: number;
  value: number;
}

export interface PendingPOData {
  totalOrders: number;
  totalValue: number;
  recentPOs: { id: string; supplier: string; date: string; pendingDays: number; value: number }[];
}

export interface POAgingData {
  category: string;
  count: number;
  value: number;
}

export interface PettyCashData {
  total: number;
  locations: { name: string; balance: number }[];
}

export interface ChequeOverviewData {
  inHand: { count: number; value: number };
  pending: { count: number; value: number };
  cleared: { count: number; value: number };
  returned: { count: number; value: number };
}

export interface PDChequesData {
  total: { count: number; value: number };
  dueThisWeek: number;
  dueNextWeek: number;
}

export interface AttendanceData {
  total: number;
  present: number;
  absent: number;
  rate: number;
  employees: {
    id: string;
    name: string;
    department: string;
    status: 'Present' | 'Absent';
    timeIn: string;
    history?: {
      date: string;
      status: 'Present' | 'Absent' | 'Late';
      timeIn: string;
      timeOut: string;
    }[];
  }[];
}
