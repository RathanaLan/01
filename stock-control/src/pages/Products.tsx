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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  InputAdornment,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import apiClient from '../api/client';
import { exportToCSV } from '../utils/exportCsv';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');

  // Modals
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdjust, setOpenAdjust] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Selected item states
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Form states
  const [formData, setFormData] = useState({ name: '', sku: '', description: '', price: '', quantity: '0' });
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('Stock Count Audit');

  // Toast notification
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showToast = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchProducts = async () => {
    try {
      const res = await apiClient.get('/products');
      setProducts(res.data);
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to fetch inventory', 'error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter effect
  useEffect(() => {
    let res = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (stockFilter === 'low') {
      res = res.filter((p) => p.quantity > 0 && p.quantity <= 10);
    } else if (stockFilter === 'out') {
      res = res.filter((p) => p.quantity === 0);
    }
    setFilteredProducts(res);
  }, [products, search, stockFilter]);

  // Add Product
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/products', {
        name: formData.name,
        sku: formData.sku,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity) || 0,
      });
      showToast(`Product "${formData.name}" created successfully`);
      setOpenAdd(false);
      setFormData({ name: '', sku: '', description: '', price: '', quantity: '0' });
      fetchProducts();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to create product', 'error');
    }
  };

  // Edit Product
  const handleEditOpen = (p: any) => {
    setSelectedProduct(p);
    setFormData({
      name: p.name,
      sku: p.sku,
      description: p.description || '',
      price: p.price.toString(),
      quantity: p.quantity.toString(),
    });
    setOpenEdit(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/products/${selectedProduct.id}`, {
        name: formData.name,
        sku: formData.sku,
        description: formData.description,
        price: parseFloat(formData.price),
      });
      showToast(`Product updated successfully`);
      setOpenEdit(false);
      fetchProducts();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to update product', 'error');
    }
  };

  // Quick Stock Adjustment
  const handleAdjustOpen = (p: any) => {
    setSelectedProduct(p);
    setAdjustAmount('');
    setAdjustReason('Physical Inventory Count');
    setOpenAdjust(true);
  };

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const change = parseInt(adjustAmount);
    if (isNaN(change) || change === 0) {
      showToast('Please enter a non-zero adjustment (+ to add, - to subtract)', 'error');
      return;
    }
    try {
      await apiClient.post(`/products/${selectedProduct.id}/adjust`, {
        change,
        reason: adjustReason,
      });
      showToast(`Stock for "${selectedProduct.name}" adjusted by ${change > 0 ? '+' : ''}${change}`);
      setOpenAdjust(false);
      fetchProducts();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Stock adjustment failed', 'error');
    }
  };

  // Delete Product
  const handleDeleteOpen = (p: any) => {
    setSelectedProduct(p);
    setOpenDelete(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      await apiClient.delete(`/products/${selectedProduct.id}`);
      showToast(`Product "${selectedProduct.name}" removed from catalog`);
      setOpenDelete(false);
      fetchProducts();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to delete product', 'error');
    }
  };

  const handleExport = () => {
    exportToCSV(
      products.map((p) => ({
        ID: p.id,
        Name: p.name,
        SKU: p.sku,
        Price: p.price,
        StockQuantity: p.quantity,
        InventoryValue: (p.price * p.quantity).toFixed(2),
        Description: p.description,
        LastUpdated: p.updatedAt,
      })),
      'Inventory_Catalog'
    );
  };

  return (
    <Box>
      {/* Header and Action Bar */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Inventory Catalog
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Manage product identifiers, SKU barcodes, pricing tiers, and on-hand stock quantities.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<FileDownloadRoundedIcon />} onClick={handleExport}>
            Export CSV
          </Button>
          <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => setOpenAdd(true)}>
            Add Product
          </Button>
        </Stack>
      </Box>

      {/* Search and Filters Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Search by product name or SKU..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', md: 360 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Chip
              label={`All Items (${products.length})`}
              color={stockFilter === 'all' ? 'primary' : 'default'}
              variant={stockFilter === 'all' ? 'filled' : 'outlined'}
              onClick={() => setStockFilter('all')}
              clickable
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label="Low Stock (≤ 10)"
              color={stockFilter === 'low' ? 'warning' : 'default'}
              variant={stockFilter === 'low' ? 'filled' : 'outlined'}
              onClick={() => setStockFilter('low')}
              clickable
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label="Out of Stock (0)"
              color={stockFilter === 'out' ? 'error' : 'default'}
              variant={stockFilter === 'out' ? 'filled' : 'outlined'}
              onClick={() => setStockFilter('out')}
              clickable
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </Stack>
      </Paper>

      {/* Products Data Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Details</TableCell>
              <TableCell>SKU Code</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="center">Stock Level</TableCell>
              <TableCell align="right">Total Asset Value</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                  No matching products found in the catalog.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((p) => {
                const isOutOfStock = p.quantity === 0;
                const isLowStock = p.quantity > 0 && p.quantity <= 10;
                return (
                  <TableRow key={p.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        {p.name}
                      </Typography>
                      {p.description && (
                        <Typography noWrap variant="caption" sx={{ color: '#64748b', display: 'block', maxWidth: 280 }}>
                          {p.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip label={p.sku} size="small" variant="outlined" sx={{ fontWeight: 600, fontFamily: 'monospace' }} />
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      ${p.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${p.quantity} units`}
                        size="small"
                        color={isOutOfStock ? 'error' : isLowStock ? 'warning' : 'success'}
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#2563eb' }}>
                      ${(p.price * p.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
                        <Tooltip title="Quick Adjust Stock (+/-)">
                          <IconButton size="small" color="primary" onClick={() => handleAdjustOpen(p)}>
                            <TuneRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Product Info">
                          <IconButton size="small" color="default" onClick={() => handleEditOpen(p)}>
                            <EditRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Item">
                          <IconButton size="small" color="error" onClick={() => handleDeleteOpen(p)}>
                            <DeleteOutlineRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog: Add Product */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleAddSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>Add New Inventory Product</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                label="Product Name"
                required
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                label="SKU / Barcode"
                required
                fullWidth
                placeholder="e.g. ELEC-001"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Unit Price ($)"
                  type="number"
                  slotProps={{ htmlInput: { step: '0.01', min: '0' } }}
                  required
                  fullWidth
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <TextField
                  label="Initial Stock Quantity"
                  type="number"
                  slotProps={{ htmlInput: { min: '0' } }}
                  fullWidth
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </Stack>
              <TextField
                label="Description / Category"
                multiline
                rows={2}
                fullWidth
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Product
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Dialog: Edit Product */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleEditSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>Edit Product Details</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                label="Product Name"
                required
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                label="SKU"
                required
                fullWidth
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
              <TextField
                label="Unit Price ($)"
                type="number"
                slotProps={{ htmlInput: { step: '0.01', min: '0' } }}
                required
                fullWidth
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <TextField
                label="Description"
                multiline
                rows={2}
                fullWidth
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Update Product
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Dialog: Quick Stock Adjustment */}
      <Dialog open={openAdjust} onClose={() => setOpenAdjust(false)} maxWidth="xs" fullWidth>
        <Box component="form" onSubmit={handleAdjustSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>Adjust Stock Quantity</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
              Current on-hand quantity for <strong>{selectedProduct?.name}</strong> is{' '}
              <strong>{selectedProduct?.quantity}</strong> units.
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Quantity Adjustment (+ or -)"
                type="number"
                placeholder="e.g. +10 or -5"
                required
                fullWidth
                autoFocus
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(e.target.value)}
                helperText="Enter positive number to add stock, negative to reduce"
              />
              <TextField
                label="Audit Reason Note"
                fullWidth
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenAdjust(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Confirm Adjustment
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Dialog: Delete Confirmation */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#dc2626' }}>Delete Product</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to permanently delete <strong>{selectedProduct?.name}</strong> (SKU:{' '}
            {selectedProduct?.sku})? All associated stock movement records will be removed.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteSubmit}>
            Yes, Delete Item
          </Button>
        </DialogActions>
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
