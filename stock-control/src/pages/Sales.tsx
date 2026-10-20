import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import apiClient from '../api/client';
import { exportToCSV } from '../utils/exportCsv';

export default function Sales() {
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  // Multi-item sales cart
  const [cartItems, setCartItems] = useState<{ productId: string; quantity: string; unitPrice: number; maxStock: number }[]>([
    { productId: '', quantity: '1', unitPrice: 0, maxStock: 0 },
  ]);

  // Toast
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showToast = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchData = async () => {
    try {
      const [salesRes, prodRes] = await Promise.all([apiClient.get('/sales'), apiClient.get('/products')]);
      setSales(salesRes.data);
      setProducts(prodRes.data);
    } catch (err: any) {
      showToast('Failed to load sales data', 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductSelect = (index: number, productId: string) => {
    const prod = products.find((p) => p.id === Number(productId));
    const updated = [...cartItems];
    if (prod) {
      updated[index] = {
        ...updated[index],
        productId,
        unitPrice: prod.price,
        maxStock: prod.quantity,
        quantity: '1',
      };
    } else {
      updated[index] = { productId: '', quantity: '1', unitPrice: 0, maxStock: 0 };
    }
    setCartItems(updated);
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    const updated = [...cartItems];
    updated[index].quantity = quantity;
    setCartItems(updated);
  };

  const handleAddCartRow = () => {
    setCartItems([...cartItems, { productId: '', quantity: '1', unitPrice: 0, maxStock: 0 }]);
  };

  const handleRemoveCartRow = (index: number) => {
    if (cartItems.length === 1) return;
    setCartItems(cartItems.filter((_, idx) => idx !== index));
  };

  const currentCartTotal = cartItems.reduce((acc, item) => {
    const qty = parseInt(item.quantity) || 0;
    return acc + qty * item.unitPrice;
  }, 0);

  const handleCompleteSale = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const item of cartItems) {
      if (!item.productId) {
        showToast('Please select a product for all rows', 'error');
        return;
      }
      const qty = parseInt(item.quantity);
      if (isNaN(qty) || qty <= 0) {
        showToast('Quantity must be greater than zero', 'error');
        return;
      }
      if (qty > item.maxStock) {
        const prod = products.find((p) => p.id === Number(item.productId));
        showToast(`Requested quantity (${qty}) exceeds stock (${item.maxStock}) for ${prod?.name}`, 'error');
        return;
      }
    }

    try {
      await apiClient.post('/sales', {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      });

      showToast(`Sale recorded successfully! Total: $${currentCartTotal.toFixed(2)}`);
      setOpenAdd(false);
      setCartItems([{ productId: '', quantity: '1', unitPrice: 0, maxStock: 0 }]);
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to complete sale', 'error');
    }
  };

  const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);
  const avgOrderValue = sales.length ? totalRevenue / sales.length : 0;

  const handleExport = () => {
    exportToCSV(
      sales.map((s) => ({
        SaleID: `#${s.id}`,
        Date: s.createdAt,
        TotalRevenue: s.total.toFixed(2),
        ItemsCount: s.items.length,
        LineItems: s.items.map((i: any) => `${i.product?.name || i.productId} (x${i.quantity})`).join('; '),
      })),
      'Sales_Transactions_Log'
    );
  };

  return (
    <Box>
      {/* Header and Actions */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Point of Sale & Orders
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Process customer checkouts, deduct stock in real time, and audit revenue transactions.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<FileDownloadRoundedIcon />} onClick={handleExport}>
            Export CSV
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddShoppingCartRoundedIcon />}
            onClick={() => setOpenAdd(true)}
          >
            Record Sale
          </Button>
        </Stack>
      </Box>

      {/* Metric Highlights */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ borderLeft: '4px solid #10b981' }}>
            <CardContent>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Revenue
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5 }}>
                ${totalRevenue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ borderLeft: '4px solid #2563eb' }}>
            <CardContent>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Sales Dispatched
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5 }}>
                {sales.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ borderLeft: '4px solid #7c3aed' }}>
            <CardContent>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Average Order Value
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5 }}>
                ${avgOrderValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sales History Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Date & Timestamp</TableCell>
              <TableCell>Products Sold</TableCell>
              <TableCell align="right">Invoice Total</TableCell>
              <TableCell align="center">Fulfillment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                  No sales recorded yet. Click "Record Sale" to start checkout.
                </TableCell>
              </TableRow>
            ) : (
              sales.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      #{s.id}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {new Date(s.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      {s.items.map((i: any) => (
                        <Typography key={i.id} variant="caption" sx={{ color: '#334155', display: 'block' }}>
                          • <strong>{i.product?.name || `Product #${i.productId}`}</strong> × {i.quantity} @ ${i.unitPrice.toFixed(2)}
                        </Typography>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, color: '#16a34a', fontSize: '1rem' }}>
                    ${s.total.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip label="Dispatched" size="small" color="success" variant="outlined" sx={{ fontWeight: 700 }} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog: Record New Sale */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="md" fullWidth>
        <Box component="form" onSubmit={handleCompleteSale}>
          <DialogTitle sx={{ fontWeight: 700 }}>Record New Customer Sale</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Typography variant="subtitle2" sx={{ color: '#64748b' }}>
                Select items from catalog. On-hand quantities will be validated and automatically deducted.
              </Typography>

              {cartItems.map((item, index) => (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }} key={index}>
                  <FormControl sx={{ flex: 3 }} required>
                    <InputLabel>Product Item</InputLabel>
                    <Select
                      value={item.productId}
                      label="Product Item"
                      onChange={(e) => handleProductSelect(index, e.target.value)}
                    >
                      {products.map((p) => (
                        <MenuItem key={p.id} value={p.id} disabled={p.quantity <= 0}>
                          {p.name} ({p.sku}) — Stock: {p.quantity} (${p.price.toFixed(2)})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Quantity"
                    type="number"
                    sx={{ width: 110 }}
                    slotProps={{ htmlInput: { min: '1', max: item.maxStock || undefined } }}
                    required
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    helperText={item.productId ? `Max: ${item.maxStock}` : ''}
                  />

                  <Box sx={{ width: 120, textAlign: 'right' }}>
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                      Subtotal
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      ${((parseInt(item.quantity) || 0) * item.unitPrice).toFixed(2)}
                    </Typography>
                  </Box>

                  <Tooltip title="Remove item">
                    <span>
                      <IconButton
                        disabled={cartItems.length === 1}
                        onClick={() => handleRemoveCartRow(index)}
                        color="error"
                      >
                        <DeleteOutlineRoundedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Stack>
              ))}

              <Button variant="outlined" onClick={handleAddCartRow} sx={{ alignSelf: 'flex-start' }}>
                + Add Another Product
              </Button>

              <Box sx={{ p: 2, bgcolor: '#f1f5f9', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#334155' }}>
                  Total Invoice Amount:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#16a34a' }}>
                  ${currentCartTotal.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="success">
              Authorize & Checkout
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
