// In-browser mock persistence engine for GitHub Pages / static hosting demo
const STORAGE_PREFIX = 'stockflow_demo_';

function getStored<T>(key: string, defaultVal: T): T {
  const data = localStorage.getItem(STORAGE_PREFIX + key);
  if (!data) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
}

// Initial mock datasets
const defaultProducts = [
  { id: 1, name: 'Industrial Drill Press', sku: 'TOOL-DRL-001', description: 'Heavy-duty 16-speed workshop drill', price: 449.99, quantity: 18, updatedAt: new Date().toISOString() },
  { id: 2, name: 'Precision Caliper Gauge', sku: 'TOOL-CAL-002', description: 'Stainless steel 150mm digital gauge', price: 59.5, quantity: 8, updatedAt: new Date().toISOString() },
  { id: 3, name: 'High-Temp Thermal Grease', sku: 'CHEM-THM-003', description: 'Silicone heat-sink grease tube', price: 12.0, quantity: 4, updatedAt: new Date().toISOString() },
  { id: 4, name: 'Pneumatic Air Hose (50ft)', sku: 'PNEU-HSE-004', description: 'Reinforced 300 PSI rubber hose', price: 34.0, quantity: 35, updatedAt: new Date().toISOString() },
  { id: 5, name: 'Safety Protective Goggles', sku: 'PPE-GGL-005', description: 'Anti-fog ANSI Z87.1 rated', price: 15.0, quantity: 0, updatedAt: new Date().toISOString() },
];

const defaultSuppliers = [
  { id: 1, name: 'Apex Tool Supply Corp', contact: 'Marcus Vance', email: 'orders@apextools.com', phone: '+1 (555) 234-5678', address: 'Chicago Distribution Center, IL', purchases: [{ id: 1 }] },
  { id: 2, name: 'Global Safety Essentials', contact: 'Elena Rostova', email: 'sales@globalsafety.net', phone: '+1 (555) 876-5432', address: 'Dallas Logistics Hub, TX', purchases: [] },
];

const defaultPurchases = [
  {
    id: 1,
    supplierId: 1,
    supplier: { id: 1, name: 'Apex Tool Supply Corp' },
    status: 'RECEIVED',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    items: [{ id: 1, productId: 1, quantity: 10, unitPrice: 400.0, product: defaultProducts[0] }],
  },
  {
    id: 2,
    supplierId: 1,
    supplier: { id: 1, name: 'Apex Tool Supply Corp' },
    status: 'PENDING',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [{ id: 2, productId: 3, quantity: 20, unitPrice: 9.5, product: defaultProducts[2] }],
  },
];

const defaultSales = [
  {
    id: 1,
    total: 899.98,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [{ id: 1, productId: 1, quantity: 2, unitPrice: 449.99, product: defaultProducts[0] }],
  },
  {
    id: 2,
    total: 178.5,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [{ id: 2, productId: 2, quantity: 3, unitPrice: 59.5, product: defaultProducts[1] }],
  },
];

const defaultMovements = [
  { id: 1, productId: 1, product: defaultProducts[0], quantity: 10, type: 'INBOUND', createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 2, productId: 1, product: defaultProducts[0], quantity: 2, type: 'OUTBOUND', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 3, productId: 2, product: defaultProducts[1], quantity: 3, type: 'OUTBOUND', createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export const mockDb = {
  getProducts: (): any[] => getStored('products', defaultProducts),
  saveProducts: (data: any[]) => setStored('products', data),

  getSuppliers: (): any[] => getStored('suppliers', defaultSuppliers),
  saveSuppliers: (data: any[]) => setStored('suppliers', data),

  getPurchases: (): any[] => getStored('purchases', defaultPurchases),
  savePurchases: (data: any[]) => setStored('purchases', data),

  getSales: (): any[] => getStored('sales', defaultSales),
  saveSales: (data: any[]) => setStored('sales', data),

  getMovements: (): any[] => getStored('movements', defaultMovements),
  saveMovements: (data: any[]) => setStored('movements', data),

  getAnalytics: () => {
    const products = mockDb.getProducts();
    const suppliers = mockDb.getSuppliers();
    const sales = mockDb.getSales();
    const orders = mockDb.getPurchases();
    const movements = mockDb.getMovements();

    const totalStockQty = products.reduce((acc, p) => acc + p.quantity, 0);
    const totalInventoryValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const lowStockItems = products.filter((p) => p.quantity <= 10);
    const outOfStockItems = products.filter((p) => p.quantity === 0);
    const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);

    const daysMap: { [key: string]: number } = {};
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      daysMap[d.toISOString().split('T')[0]] = 0;
    }

    sales.forEach((s: any) => {
      const d = new Date(s.createdAt).toISOString().split('T')[0];
      if (daysMap[d] !== undefined) daysMap[d] += s.total;
    });

    const salesTrend = Object.keys(daysMap).map((date) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: parseFloat(daysMap[date].toFixed(2)),
    }));

    const topStockProducts = [...products]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map((p) => ({ name: p.name, quantity: p.quantity, value: p.price * p.quantity }));

    return {
      summary: {
        totalProducts: products.length,
        totalSuppliers: suppliers.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter((o: any) => o.status === 'PENDING').length,
        totalSales: sales.length,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalStockQty,
        totalInventoryValue: parseFloat(totalInventoryValue.toFixed(2)),
        lowStockCount: lowStockItems.length,
        outOfStockCount: outOfStockItems.length,
      },
      lowStockItems: lowStockItems.slice(0, 6),
      salesTrend,
      topStockProducts,
      recentMovements: movements.slice(0, 10),
    };
  },
};
