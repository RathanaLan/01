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
  Chip,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';

import apiClient from '../api/client';
import { exportToCSV } from '../utils/exportCsv';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  // Modals
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Selected supplier
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  // Form fields
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', phone: '', address: '' });

  // Toast
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showToast = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchSuppliers = async () => {
    try {
      const res = await apiClient.get('/suppliers');
      setSuppliers(res.data);
    } catch (err: any) {
      showToast('Failed to fetch suppliers list', 'error');
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    let res = [...suppliers];
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.contact && s.contact.toLowerCase().includes(q)) ||
          (s.email && s.email.toLowerCase().includes(q))
      );
    }
    setFilteredSuppliers(res);
  }, [suppliers, search]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/suppliers', formData);
      showToast(`Supplier "${formData.name}" added successfully`);
      setOpenAdd(false);
      setFormData({ name: '', contact: '', email: '', phone: '', address: '' });
      fetchSuppliers();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to add supplier', 'error');
    }
  };

  const handleEditOpen = (s: any) => {
    setSelectedSupplier(s);
    setFormData({
      name: s.name,
      contact: s.contact || '',
      email: s.email || '',
      phone: s.phone || '',
      address: s.address || '',
    });
    setOpenEdit(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/suppliers/${selectedSupplier.id}`, formData);
      showToast('Supplier updated successfully');
      setOpenEdit(false);
      fetchSuppliers();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to update supplier', 'error');
    }
  };

  const handleDeleteOpen = (s: any) => {
    setSelectedSupplier(s);
    setOpenDelete(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      await apiClient.delete(`/suppliers/${selectedSupplier.id}`);
      showToast(`Supplier "${selectedSupplier.name}" removed`);
      setOpenDelete(false);
      fetchSuppliers();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to delete supplier', 'error');
    }
  };

  const handleExport = () => {
    exportToCSV(
      suppliers.map((s) => ({
        ID: s.id,
        CompanyName: s.name,
        ContactPerson: s.contact,
        Email: s.email,
        Phone: s.phone,
        Address: s.address,
      })),
      'Supplier_Directory'
    );
  };

  return (
    <Box>
      {/* Header and Actions */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Supplier Directory
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Maintain vendor partnerships, procurement contacts, and distributor profiles.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<FileDownloadRoundedIcon />} onClick={handleExport}>
            Export CSV
          </Button>
          <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => setOpenAdd(true)}>
            Add Supplier
          </Button>
        </Stack>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          placeholder="Search suppliers by vendor name, contact person, or email..."
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
      </Paper>

      {/* Suppliers Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company / Vendor</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Contact Details</TableCell>
              <TableCell>Warehouse Location</TableCell>
              <TableCell align="center">Purchase Orders</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                  No suppliers found matching your query.
                </TableCell>
              </TableRow>
            ) : (
              filteredSuppliers.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(37, 99, 235, 0.08)', color: 'primary.main' }}>
                        <BusinessRoundedIcon fontSize="small" />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        {s.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#334155', fontWeight: 500 }}>
                    {s.contact || <em style={{ color: '#94a3b8' }}>Not provided</em>}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      {s.email && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#475569', fontSize: '0.8rem' }}>
                          <EmailRoundedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
                          {s.email}
                        </Box>
                      )}
                      {s.phone && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#475569', fontSize: '0.8rem' }}>
                          <PhoneRoundedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
                          {s.phone}
                        </Box>
                      )}
                      {!s.email && !s.phone && <Typography variant="caption" sx={{ color: '#94a3b8' }}>None</Typography>}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {s.address || '—'}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${s.purchases?.length || 0} POs`}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
                      <Tooltip title="Edit Supplier">
                        <IconButton size="small" onClick={() => handleEditOpen(s)}>
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Supplier">
                        <IconButton size="small" color="error" onClick={() => handleDeleteOpen(s)}>
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog: Add Supplier */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleAddSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>Add New Vendor / Supplier</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                label="Company Name"
                required
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                label="Contact Representative"
                fullWidth
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Stack>
              <TextField
                label="Physical Facility / Dispatch Address"
                multiline
                rows={2}
                fullWidth
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Supplier
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Dialog: Edit Supplier */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleEditSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>Edit Supplier Information</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                label="Company Name"
                required
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                label="Contact Representative"
                fullWidth
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Stack>
              <TextField
                label="Dispatch Address"
                multiline
                rows={2}
                fullWidth
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Update Supplier
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Dialog: Delete Confirmation */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#dc2626' }}>Remove Supplier</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete supplier <strong>{selectedSupplier?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteSubmit}>
            Yes, Remove
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
