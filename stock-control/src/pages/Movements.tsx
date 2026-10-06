import { useState, useEffect } from 'react';
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
  Stack,
  InputAdornment,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

import apiClient from '../api/client';
import { exportToCSV } from '../utils/exportCsv';

export default function Movements() {
  const [movements, setMovements] = useState<any[]>([]);
  const [filteredMovements, setFilteredMovements] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'INBOUND' | 'OUTBOUND'>('ALL');
  const [search, setSearch] = useState('');

  const fetchMovements = async () => {
    try {
      const res = await apiClient.get('/movements');
      setMovements(res.data);
    } catch (err) {
      console.error('Failed to load stock movements', err);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  useEffect(() => {
    let res = [...movements];
    if (typeFilter !== 'ALL') {
      res = res.filter((m) => m.type === typeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(
        (m) =>
          (m.product?.name && m.product.name.toLowerCase().includes(q)) ||
          (m.product?.sku && m.product.sku.toLowerCase().includes(q))
      );
    }
    setFilteredMovements(res);
  }, [movements, typeFilter, search]);

  const totalInbound = movements.filter((m) => m.type === 'INBOUND').reduce((acc, m) => acc + m.quantity, 0);
  const totalOutbound = movements.filter((m) => m.type === 'OUTBOUND').reduce((acc, m) => acc + m.quantity, 0);

  const handleExport = () => {
    exportToCSV(
      movements.map((m) => ({
        AuditID: `#${m.id}`,
        Timestamp: m.createdAt,
        MovementType: m.type,
        ProductName: m.product?.name,
        SKU: m.product?.sku,
        QuantityDelta: m.type === 'INBOUND' ? `+${m.quantity}` : `-${m.quantity}`,
      })),
      'Stock_Movements_Audit_Log'
    );
  };

  return (
    <Box>
      {/* Header and Action */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Stock Audit Log
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Comprehensive traceability ledger of all inventory increments, dispatches, audits, and adjustments.
          </Typography>
        </Box>

        <Button variant="outlined" startIcon={<FileDownloadRoundedIcon />} onClick={handleExport}>
          Export Audit Trail
        </Button>
      </Box>

      {/* Movement Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ borderLeft: '4px solid #10b981' }}>
            <CardContent>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Inbound Replenished
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#16a34a', mt: 0.5 }}>
                +{totalInbound} units
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ borderLeft: '4px solid #ef4444' }}>
            <CardContent>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Outbound Dispatched
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#dc2626', mt: 0.5 }}>
                -{totalOutbound} units
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ borderLeft: '4px solid #2563eb' }}>
            <CardContent>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Net Inventory Flow
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5 }}>
                {totalInbound - totalOutbound >= 0 ? `+${totalInbound - totalOutbound}` : totalInbound - totalOutbound} units
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter and Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Search audit trail by product name or SKU..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', sm: 380 } }}
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

          <Stack direction="row" spacing={1}>
            <Chip
              label="All Events"
              color={typeFilter === 'ALL' ? 'primary' : 'default'}
              variant={typeFilter === 'ALL' ? 'filled' : 'outlined'}
              onClick={() => setTypeFilter('ALL')}
              clickable
              sx={{ fontWeight: 600 }}
            />
            <Chip
              icon={<ArrowDownwardRoundedIcon />}
              label="Inbound (+)"
              color={typeFilter === 'INBOUND' ? 'success' : 'default'}
              variant={typeFilter === 'INBOUND' ? 'filled' : 'outlined'}
              onClick={() => setTypeFilter('INBOUND')}
              clickable
              sx={{ fontWeight: 600 }}
            />
            <Chip
              icon={<ArrowUpwardRoundedIcon />}
              label="Outbound (-)"
              color={typeFilter === 'OUTBOUND' ? 'error' : 'default'}
              variant={typeFilter === 'OUTBOUND' ? 'filled' : 'outlined'}
              onClick={() => setTypeFilter('OUTBOUND')}
              clickable
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </Stack>
      </Paper>

      {/* Audit Log Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Log ID</TableCell>
              <TableCell>Date & Timestamp</TableCell>
              <TableCell>Flow Direction</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell align="right">Quantity Delta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                  No stock movement records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMovements.map((m) => {
                const isInbound = m.type === 'INBOUND';
                return (
                  <TableRow key={m.id} hover>
                    <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>#{m.id}</TableCell>
                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem' }}>
                      {new Date(m.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={isInbound ? <ArrowDownwardRoundedIcon /> : <ArrowUpwardRoundedIcon />}
                        label={m.type}
                        size="small"
                        color={isInbound ? 'success' : 'error'}
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>
                      {m.product?.name || `Product #${m.productId}`}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={m.product?.sku || 'N/A'}
                        size="small"
                        variant="outlined"
                        sx={{ fontFamily: 'monospace' }}
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: isInbound ? '#16a34a' : '#dc2626',
                      }}
                    >
                      {isInbound ? `+${m.quantity}` : `-${m.quantity}`}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
