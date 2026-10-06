import axios from 'axios';
import { mockDb } from './mockService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback to Mock Database when running on GitHub Pages / without local backend server
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If connection refused, timed out, or network error
    if (!error.response || error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      const config = error.config;
      const url = config.url || '';
      const method = (config.method || 'get').toLowerCase();
      const body = config.data ? JSON.parse(config.data) : {};

      console.info(`[StockFlow Demo Engine] Serving ${method.toUpperCase()} ${url} from client storage`);

      // Mock Auth
      if (url.includes('/auth/me')) {
        return { data: { id: 1, email: localStorage.getItem('user_email') || 'admin@stockflow.internal', role: 'ADMIN' }, status: 200 };
      }

      // Mock Analytics
      if (url.includes('/analytics')) {
        return { data: mockDb.getAnalytics(), status: 200 };
      }

      // Mock Products
      if (url === '/products' || url.startsWith('/products?')) {
        if (method === 'get') {
          return { data: mockDb.getProducts(), status: 200 };
        }
        if (method === 'post') {
          const products = mockDb.getProducts();
          const newProd = {
            id: Date.now(),
            name: body.name,
            sku: body.sku,
            description: body.description || '',
            price: parseFloat(body.price),
            quantity: parseInt(body.quantity) || 0,
            updatedAt: new Date().toISOString(),
          };
          products.unshift(newProd);
          mockDb.saveProducts(products);

          if (newProd.quantity > 0) {
            const movements = mockDb.getMovements();
            movements.unshift({
              id: Date.now(),
              productId: newProd.id,
              product: newProd,
              quantity: newProd.quantity,
              type: 'INBOUND',
              createdAt: new Date().toISOString(),
            });
            mockDb.saveMovements(movements);
          }

          return { data: newProd, status: 201 };
        }
      }

      // Adjust Stock
      if (url.includes('/adjust') && method === 'post') {
        const id = parseInt(url.split('/')[2]);
        const products = mockDb.getProducts();
        const prod = products.find((p) => p.id === id);
        if (prod) {
          prod.quantity += parseInt(body.change);
          mockDb.saveProducts(products);

          const movements = mockDb.getMovements();
          movements.unshift({
            id: Date.now(),
            productId: id,
            product: prod,
            quantity: Math.abs(body.change),
            type: body.change > 0 ? 'INBOUND' : 'OUTBOUND',
            createdAt: new Date().toISOString(),
          });
          mockDb.saveMovements(movements);
          return { data: prod, status: 200 };
        }
      }

      // Update / Delete Product
      if (url.startsWith('/products/')) {
        const id = parseInt(url.split('/')[2]);
        let products = mockDb.getProducts();
        if (method === 'put') {
          products = products.map((p) => (p.id === id ? { ...p, ...body } : p));
          mockDb.saveProducts(products);
          return { data: { success: true }, status: 200 };
        }
        if (method === 'delete') {
          products = products.filter((p) => p.id !== id);
          mockDb.saveProducts(products);
          return { data: { success: true }, status: 200 };
        }
      }

      // Mock Suppliers
      if (url === '/suppliers') {
        if (method === 'get') {
          return { data: mockDb.getSuppliers(), status: 200 };
        }
        if (method === 'post') {
          const suppliers = mockDb.getSuppliers();
          const newSup = { id: Date.now(), purchases: [], ...body };
          suppliers.unshift(newSup);
          mockDb.saveSuppliers(suppliers);
          return { data: newSup, status: 201 };
        }
      }
      if (url.startsWith('/suppliers/')) {
        const id = parseInt(url.split('/')[2]);
        let suppliers = mockDb.getSuppliers();
        if (method === 'put') {
          suppliers = suppliers.map((s) => (s.id === id ? { ...s, ...body } : s));
          mockDb.saveSuppliers(suppliers);
          return { data: { success: true }, status: 200 };
        }
        if (method === 'delete') {
          suppliers = suppliers.filter((s) => s.id !== id);
          mockDb.saveSuppliers(suppliers);
          return { data: { success: true }, status: 200 };
        }
      }

      // Mock Purchases
      if (url === '/purchases') {
        if (method === 'get') {
          return { data: mockDb.getPurchases(), status: 200 };
        }
        if (method === 'post') {
          const purchases = mockDb.getPurchases();
          const suppliers = mockDb.getSuppliers();
          const products = mockDb.getProducts();
          const sup = suppliers.find((s) => s.id === Number(body.supplierId));

          const newPO: any = {
            id: purchases.length + 1,
            supplierId: Number(body.supplierId),
            supplier: sup || { id: Number(body.supplierId), name: 'Supplier' },
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            items: body.items.map((i: any, idx: number) => ({
              id: Date.now() + idx,
              productId: Number(i.productId),
              quantity: parseInt(i.quantity),
              unitPrice: parseFloat(i.unitPrice),
              product: products.find((p) => p.id === Number(i.productId)),
            })),
          };
          purchases.unshift(newPO);
          mockDb.savePurchases(purchases);
          return { data: newPO, status: 201 };
        }
      }

      // Mark Received PO
      if (url.includes('/purchases/') && url.includes('/status')) {
        const id = parseInt(url.split('/')[2]);
        const purchases = mockDb.getPurchases();
        const po = purchases.find((p) => p.id === id);
        if (po) {
          po.status = body.status;
          const products = mockDb.getProducts();
          const movements = mockDb.getMovements();

          po.items.forEach((item: any) => {
            const prod = products.find((p) => p.id === item.productId);
            if (prod) {
              prod.quantity += item.quantity;
            }
            movements.unshift({
              id: Date.now(),
              productId: item.productId,
              product: prod,
              quantity: item.quantity,
              type: 'INBOUND',
              createdAt: new Date().toISOString(),
            });
          });

          mockDb.saveProducts(products);
          mockDb.saveMovements(movements);
          mockDb.savePurchases(purchases);
          return { data: po, status: 200 };
        }
      }

      // Mock Sales
      if (url === '/sales') {
        if (method === 'get') {
          return { data: mockDb.getSales(), status: 200 };
        }
        if (method === 'post') {
          const sales = mockDb.getSales();
          const products = mockDb.getProducts();
          const movements = mockDb.getMovements();

          let total = 0;
          const items = body.items.map((i: any, idx: number) => {
            const prod = products.find((p) => p.id === Number(i.productId));
            const sub = parseInt(i.quantity) * parseFloat(i.unitPrice);
            total += sub;
            if (prod) prod.quantity -= parseInt(i.quantity);
            movements.unshift({
              id: Date.now() + idx,
              productId: Number(i.productId),
              product: prod,
              quantity: parseInt(i.quantity),
              type: 'OUTBOUND',
              createdAt: new Date().toISOString(),
            });
            return {
              id: Date.now() + idx,
              productId: Number(i.productId),
              quantity: parseInt(i.quantity),
              unitPrice: parseFloat(i.unitPrice),
              product: prod,
            };
          });

          mockDb.saveProducts(products);
          mockDb.saveMovements(movements);

          const newSale = {
            id: sales.length + 1,
            total: parseFloat(total.toFixed(2)),
            createdAt: new Date().toISOString(),
            items,
          };
          sales.unshift(newSale);
          mockDb.saveSales(sales);
          return { data: newSale, status: 201 };
        }
      }

      // Mock Movements
      if (url.startsWith('/movements')) {
        return { data: mockDb.getMovements(), status: 200 };
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
