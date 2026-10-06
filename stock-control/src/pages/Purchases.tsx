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
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import apiClient from '../api/client';
import { exportToCSV } from '../utils/exportCsv';

export default function Purchases() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [statusTab, setStatusTab] = useState<'ALL' | 'PENDING' | 'RECEIVED'>('ALL');

  // Modal State
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [orderItems, setOrderItems] = useState<{ productId: string; quantity: string; unitPrice: string }[]>([
    { productId: '', quantity: '1', unitPrice: '' },
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
      const [ordRes, supRes, prodRes] = await Promise.all([
        apiClient.get('/purchases'),
        apiClient.get('/suppliers'),
        apiClient.get('/products'),
      ]);
      setOrders(ordRes.data);
      setSuppliers(supRes.data);
      setProducts(prodRes.data);
    } catch (err: any) {
      showToast('Failed to load purchase orders', 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (statusTab === 'ALL') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status === statusTab));
    }
  }, [orders, statusTab]);

  const handleItemChange = (index: number, field: string, value: string) => {
    const updated = [...orderItems];
    updated[index] = { ...updated[index], [field]: value };

    if (field === 'productId') {
      const prod = products.find((p) => p.id === Number(value));
      if (prod) {
        updated[index].unitPrice = prod.price.toString();
      }
    }
    setOrderItems(updated);
  };

  const handleAddItemRow = () => {
    setOrderItems([...orderItems, { productId: '', quantity: '1', unitPrice: '' }]);
  };

  const handleRemoveItemRow = (index: number) => {
    if (orderItems.length === 1) return;
    setOrderItems(orderItems.filter((_, idx) => idx !== index));
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplier) {
      showToast('Please select a supplier', 'error');
      return;
    }

    const validItems = orderItems.filter((i) => i.productId && parseInt(i.quantity) > 0);
    if (!validItems.length) {
      showToast('Please add at least one valid product line item', 'error');
      return;
    }

    try {
      await apiClient.post('/purchases', {
        supplierId: selectedSupplier,
        items: validItems,
      });
      showToast('Purchase Order generated successfully');
      setOpenAdd(false);
      setSelectedSupplier('');
      setOrderItems([{ productId: '', quantity: '1', unitPrice: '' }]);
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to create PO', 'error');
    }
  };

  const handleMarkReceived = async (id: number) => {
    try {
      await apiClient.put(`/purchases/${id}/status`, { status: 'RECEIVED' });
      showToast('PO received! Inventory stock updated and inbound movement recorded.');
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to update order status', 'error');
    }
  };

  const handleExport = () => {
    exportToCSV(
      orders.map((o) => ({
        OrderID: `#${o.id}`,
        Supplier: o.supplier?.name,
        Status: o.status,
        ItemsCount: o.items.length,
        TotalItemsQty: o.items.reduce((acc: number, item: any) => acc + item.quantity, 0),
        EstimatedCost: o.items.reduce((acc: number, item: any) => acc + item.quantity * item.unitPrice, 0).toFixed(2),
        DateCreated: o.createdAt,
      })),
      'Purchase_Orders_Report'
    );
  };

  return (
    <Box>
      {/* Header and Action */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Procurement & Purchase Orders
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Generate vendor purchase requests, manage inbound shipments, and automate inventory replenishment.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<FileDownloadRoundedIcon />} onClick={handleExport}>
            Export CSV
          </Button>
          <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => setOpenAdd(true)}>
            Create PO
          </Button>
        </Stack>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={statusTab}
          onChange={(_, val) => setStatusTab(val)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ px: 2 }}
        >
          <Tab value="ALL" label={`All Orders (${orders.length})`} sx={{ fontWeight: 600 }} />
          <Tab
            value="PENDING"
            label={`Pending Inbound (${orders.filter((o) => o.status === 'PENDING').length})`}
            sx={{ fontWeight: 600 }}
          />
          <Tab
            value="RECEIVED"
            label={`Received / Completed (${orders.filter((o) => o.status === 'RECEIVED').length})`}
            sx={{ fontWeight: 600 }}
          />
        </Tabs>
      </Paper>

      {/* Purchase Orders Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PO Reference</TableCell>
              <TableCell>Supplier / Vendor</TableCell>
              <TableCell>Line Items</TableCell>
              <TableCell align="right">Total Value</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                  No purchase orders found for this filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((o) => {
                const totalCost = o.items.reduce((acc: number, i: any) => acc + i.quantity * i.unitPrice, 0);
                const isPending = o.status === 'PENDING';
                return (
                  <TableRow key={o.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        #{o.id}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {new Date(o.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>
                      {o.supplier?.name || 'Unknown Supplier'}
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        {o.items.map((i: any) => (
                          <Typography key={i.id} variant="caption" sx={{ color: '#475569', display: 'block' }}>
                            • <strong>{i.product?.name || `Product #${i.productId}`}</strong> × {i.quantity} @ ${i.unitPrice.toFixed(2)}
                          </Typography>
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: '#2563eb' }}>
                      ${totalCost.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={o.status}
                        size="small"
                        color={isPending ? 'warning' : 'success'}
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {isPending ? (
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          startIcon={<CheckCircleOutlineRoundedIcon />}
                          onClick={() => handleMarkReceived(o.id)}
                        >
                          Receive Stock
                        </Button>
                      ) : (
                        <Chip label="Stock Loaded" size="small" variant="outlined" color="success" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog: Create Purchase Order */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="md" fullWidth>
        <Box component="form" onSubmit={handleCreateOrder}>
          <DialogTitle sx={{ fontWeight: 700 }}>Generate Purchase Order</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <FormControl fullWidth required>
                <InputLabel>Target Supplier</InputLabel>
                <Select
                  value={selectedSupplier}
                  label="Target Supplier"
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                >
                  {suppliers.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name} ({s.contact || 'Direct'})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155' }}>
                Order Line Items
              </Typography>

              {orderItems.map((item, index) => (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }} key={index}>
                  <FormControl sx={{ flex: 2 }} required>
                    <InputLabel>Product</InputLabel>
                    <Select
                      value={item.productId}
                      label="Product"
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                    >
                      {products.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.name} ({p.sku}) — In Stock: {p.quantity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Units"
                    type="number"
                    sx={{ width: 100 }}
                    slotProps={{ htmlInput: { min: '1' } }}
                    required
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />

                  <TextField
                    label="Unit Cost ($)"
                    type="number"
                    sx={{ width: 130 }}
                    slotProps={{ htmlInput: { step: '0.01', min: '0' } }}
                    required
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  />

                  <Tooltip title="Remove row">
                    <span>
                      <IconButton
                        disabled={orderItems.length === 1}
                        onClick={() => handleRemoveItemRow(index)}
                        color="error"
                      >
                        <DeleteOutlineRoundedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Stack>
              ))}

              <Button variant="outlined" onClick={handleAddItemRow} sx={{ alignSelf: 'flex-start' }}>
                + Add Another Product Line
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit Purchase Order
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
