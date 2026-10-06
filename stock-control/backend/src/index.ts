import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

app.use(cors());
app.use(express.json());

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware: Authenticate JWT
const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
};

// Middleware: Admin only
const adminMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ error: 'Forbidden. Admin privileges required.' });
  }
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email is already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role === 'ADMIN' ? 'ADMIN' : 'USER'
      }
    });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/me', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true, createdAt: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- ANALYTICS & DASHBOARD METRICS ---
app.get('/api/analytics', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const [products, suppliers, sales, orders, movements] = await Promise.all([
      prisma.product.findMany(),
      prisma.supplier.findMany(),
      prisma.sale.findMany({ include: { items: { include: { product: true } } } }),
      prisma.purchaseOrder.findMany({ include: { supplier: true, items: true } }),
      prisma.stockMovement.findMany({ include: { product: true }, take: 10, orderBy: { createdAt: 'desc' } })
    ]);

    const totalStockQty = products.reduce((acc, p) => acc + p.quantity, 0);
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    const lowStockItems = products.filter(p => p.quantity <= 10);
    const outOfStockItems = products.filter(p => p.quantity === 0);
    const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);

    // Last 7 days sales aggregation
    const daysMap: { [key: string]: number } = {};
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const key = d.toISOString().split('T')[0];
      daysMap[key] = 0;
    }

    sales.forEach(sale => {
      const saleDate = new Date(sale.createdAt).toISOString().split('T')[0];
      if (daysMap[saleDate] !== undefined) {
        daysMap[saleDate] += sale.total;
      }
    });

    const salesTrend = Object.keys(daysMap).map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: parseFloat(daysMap[date].toFixed(2))
    }));

    // Stock distribution by top products
    const topStockProducts = [...products]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(p => ({ name: p.name, quantity: p.quantity, value: p.price * p.quantity }));

    res.json({
      summary: {
        totalProducts: products.length,
        totalSuppliers: suppliers.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'PENDING').length,
        totalSales: sales.length,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalStockQty,
        totalInventoryValue: parseFloat(totalInventoryValue.toFixed(2)),
        lowStockCount: lowStockItems.length,
        outOfStockCount: outOfStockItems.length
      },
      lowStockItems: lowStockItems.slice(0, 6),
      salesTrend,
      topStockProducts,
      recentMovements: movements
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- PRODUCT ROUTES ---
app.get('/api/products', authMiddleware, async (req: Request, res: Response) => {
  const { search, lowStock } = req.query;
  let products = await prisma.product.findMany({ orderBy: { updatedAt: 'desc' } });

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }

  if (lowStock === 'true') {
    products = products.filter(p => p.quantity <= 10);
  }

  res.json(products);
});

app.post('/api/products', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, sku, description, price, quantity } = req.body;
    if (!name || !sku) return res.status(400).json({ error: 'Product name and SKU are required' });

    const existingSku = await prisma.product.findUnique({ where: { sku } });
    if (existingSku) return res.status(400).json({ error: `SKU '${sku}' already exists` });

    const qty = parseInt(quantity) || 0;
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        description: description || '',
        price: parseFloat(price) || 0,
        quantity: qty
      }
    });

    if (qty > 0) {
      await prisma.stockMovement.create({
        data: {
          productId: product.id,
          quantity: qty,
          type: 'INBOUND'
        }
      });
    }

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string);
    const { name, sku, description, price } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        sku,
        description,
        price: parseFloat(price) || 0
      }
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Quick Stock Adjustment
app.post('/api/products/:id/adjust', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string);
    const { change, reason } = req.body; // change: number (+5 or -3)
    const amount = parseInt(change);

    if (isNaN(amount) || amount === 0) {
      return res.status(400).json({ error: 'Valid quantity change required' });
    }

    const current = await prisma.product.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ error: 'Product not found' });

    if (current.quantity + amount < 0) {
      return res.status(400).json({ error: `Cannot reduce below 0. Current stock is ${current.quantity}` });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { quantity: current.quantity + amount }
    });

    await prisma.stockMovement.create({
      data: {
        productId: id,
        quantity: Math.abs(amount),
        type: amount > 0 ? 'INBOUND' : 'OUTBOUND'
      }
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string);
    // Delete linked movements, items first to avoid foreign key errors
    await prisma.stockMovement.deleteMany({ where: { productId: id } });
    await prisma.purchaseItem.deleteMany({ where: { productId: id } });
    await prisma.saleItem.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- SUPPLIER ROUTES ---
app.get('/api/suppliers', authMiddleware, async (req: Request, res: Response) => {
  const suppliers = await prisma.supplier.findMany({
    include: { purchases: true },
    orderBy: { updatedAt: 'desc' }
  });
  res.json(suppliers);
});

app.post('/api/suppliers', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, contact, email, phone, address } = req.body;
    if (!name) return res.status(400).json({ error: 'Supplier company name is required' });
    const supplier = await prisma.supplier.create({
      data: { name, contact, email, phone, address }
    });
    res.status(201).json(supplier);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/suppliers/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string);
    const supplier = await prisma.supplier.update({
      where: { id },
      data: req.body
    });
    res.json(supplier);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/suppliers/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string);
    const relatedOrders = await prisma.purchaseOrder.findMany({ where: { supplierId: id } });
    if (relatedOrders.length > 0) {
      return res.status(400).json({ error: 'Cannot delete supplier with active purchase orders.' });
    }
    await prisma.supplier.delete({ where: { id } });
    res.json({ success: true, message: 'Supplier deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- PURCHASE ORDERS ---
app.get('/api/purchases', authMiddleware, async (req: Request, res: Response) => {
  const orders = await prisma.purchaseOrder.findMany({
    include: {
      supplier: true,
      items: { include: { product: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

app.post('/api/purchases', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { supplierId, items } = req.body;
    if (!supplierId || !items || !items.length) {
      return res.status(400).json({ error: 'Supplier and at least one item are required' });
    }

    const order = await prisma.purchaseOrder.create({
      data: {
        supplierId: parseInt(supplierId),
        items: {
          create: items.map((i: any) => ({
            productId: parseInt(i.productId),
            quantity: parseInt(i.quantity),
            unitPrice: parseFloat(i.unitPrice)
          }))
        }
      },
      include: { items: { include: { product: true } }, supplier: true }
    });
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/purchases/:id/status', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id as string);
  const { status } = req.body;
  try {
    const order = await prisma.purchaseOrder.findUnique({ where: { id }, include: { items: true } });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.status !== 'RECEIVED' && status === 'RECEIVED') {
      // Inbound inventory increase
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { quantity: { increment: item.quantity } }
        });
        await prisma.stockMovement.create({
          data: {
            productId: item.productId,
            quantity: item.quantity,
            type: 'INBOUND'
          }
        });
      }
    }

    const updated = await prisma.purchaseOrder.update({
      where: { id },
      data: { status },
      include: { supplier: true, items: { include: { product: true } } }
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- SALES ---
app.get('/api/sales', authMiddleware, async (req: Request, res: Response) => {
  const sales = await prisma.sale.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(sales);
});

app.post('/api/sales', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { items } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ error: 'At least one item is required for a sale' });
    }

    // Verify stock availability
    for (const item of items) {
      const prod = await prisma.product.findUnique({ where: { id: parseInt(item.productId) } });
      if (!prod) return res.status(404).json({ error: `Product ID ${item.productId} not found` });
      if (prod.quantity < parseInt(item.quantity)) {
        return res.status(400).json({
          error: `Insufficient stock for "${prod.name}". Available: ${prod.quantity}, requested: ${item.quantity}`
        });
      }
    }

    let total = 0;
    items.forEach((item: any) => {
      total += parseInt(item.quantity) * parseFloat(item.unitPrice);
    });

    const sale = await prisma.sale.create({
      data: {
        total: parseFloat(total.toFixed(2)),
        items: {
          create: items.map((i: any) => ({
            productId: parseInt(i.productId),
            quantity: parseInt(i.quantity),
            unitPrice: parseFloat(i.unitPrice)
          }))
        }
      },
      include: { items: { include: { product: true } } }
    });

    // Deduct inventory & record outbound movements
    for (const item of items) {
      await prisma.product.update({
        where: { id: parseInt(item.productId) },
        data: { quantity: { decrement: parseInt(item.quantity) } }
      });
      await prisma.stockMovement.create({
        data: {
          productId: parseInt(item.productId),
          quantity: parseInt(item.quantity),
          type: 'OUTBOUND'
        }
      });
    }

    res.status(201).json(sale);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- STOCK MOVEMENTS ---
app.get('/api/movements', authMiddleware, async (req: Request, res: Response) => {
  const { type, limit } = req.query;
  const where: any = {};
  if (type === 'INBOUND' || type === 'OUTBOUND') {
    where.type = type;
  }

  const movements = await prisma.stockMovement.findMany({
    where,
    include: { product: true },
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit as string) : 100
  });
  res.json(movements);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
