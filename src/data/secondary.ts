export const rawMaterialData = {
  totalValue: 8420000,
  items: 1245,
  lowStock: 42,
  outOfStock: 8,
  categories: [
    { name: 'Chemicals', value: 3200000 },
    { name: 'Packaging', value: 2800000 },
    { name: 'Additives', value: 1420000 },
    { name: 'Labels', value: 1000000 },
  ]
};

export const fastMovingData = [
  { rank: 1, product: 'Product Alpha - 500g', quantity: 1245, value: 1820000 },
  { rank: 2, product: 'Product Beta - 1kg', quantity: 985, value: 1420000 },
  { rank: 3, product: 'Product Gamma - 200g', quantity: 812, value: 1180000 },
  { rank: 4, product: 'Product Delta - 500g', quantity: 745, value: 940000 },
];

export const pendingPOData = {
  totalOrders: 27,
  totalValue: 6820000,
  recentPOs: [
    { id: 'PO-2026-081', supplier: 'Lanka Traders', date: '15 Sep 2026', pendingDays: 8, value: 450000 },
    { id: 'PO-2026-079', supplier: 'Global Supplies', date: '10 Sep 2026', pendingDays: 13, value: 820000 },
    { id: 'PO-2026-072', supplier: 'Alpha Industries', date: '28 Aug 2026', pendingDays: 26, value: 1250000 },
    { id: 'PO-2026-065', supplier: 'Lanka Traders', date: '15 Aug 2026', pendingDays: 39, value: 340000 },
  ]
};

export const poAgingData = [
  { category: '0-7 Days', count: 12, value: 2100000 },
  { category: '8-15 Days', count: 8, value: 1800000 },
  { category: '16-30 Days', count: 4, value: 1450000 },
  { category: '31-60 Days', count: 2, value: 920000 },
  { category: '60+ Days', count: 1, value: 550000 },
];

export const pettyCashData = {
  total: 203500,
  locations: [
    { name: 'Main Office', balance: 125000 },
    { name: 'Kandy Branch', balance: 45000 },
    { name: 'Galle Branch', balance: 33500 },
  ]
};

export const chequeOverviewData = {
  inHand: { count: 42, value: 2840000 },
  pending: { count: 15, value: 1250000 },
  cleared: { count: 18, value: 1420000 },
  returned: { count: 9, value: 850000 },
};

export const pdChequesData = {
  total: { count: 31, value: 4120000 },
  dueThisWeek: 850000,
  dueNextWeek: 1200000,
};

export const attendanceData = {
  total: 125,
  present: 109,
  absent: 16,
  rate: 87.2,
};
