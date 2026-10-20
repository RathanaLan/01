import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Stack,
  Skeleton,
} from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import apiClient from '../api/client';
import { exportToCSV } from '../utils/exportCsv';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/analytics');
      setData(res.data);
    } catch (err) {
      console.error('Failed to load analytics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleExportSummary = () => {
    if (!data?.summary) return;
    exportToCSV([data.summary], 'StockFlow_Executive_Summary');
  };

  if (loading || !data) {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width={240} height={40} />
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <Skeleton variant="rectangular" height={130} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const { summary, salesTrend, topStockProducts, lowStockItems, recentMovements } = data;
  const maxRevenue = Math.max(...salesTrend.map((t: any) => t.revenue), 10);

  return (
    <Box>
      {/* Header & Quick Action Buttons */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Inventory Overview
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Real-time multi-channel stock levels, sales flow, and supply chain telemetry.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadRoundedIcon />}
            onClick={handleExportSummary}
            sx={{ borderColor: '#cbd5e1', color: '#475569' }}
          >
            Export Summary
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={() => navigate('/products')}
          >
            + New Item
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<ShoppingCartCheckoutRoundedIcon />}
            onClick={() => navigate('/sales')}
          >
            New Sale
          </Button>
        </Stack>
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 1, borderLeft: '4px solid #2563eb' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Inventory Valuation
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5 }}>
                    ${summary.totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(37, 99, 235, 0.1)', color: 'primary.main' }}>
                  <AttachMoneyRoundedIcon />
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', mt: 1, display: 'block' }}>
                Across {summary.totalStockQty} total units on shelf
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 1, borderLeft: '4px solid #10b981' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Total Sales Revenue
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5 }}>
                    ${summary.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', color: 'success.main' }}>
                  <TrendingUpRoundedIcon />
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: '#10b981', mt: 1, display: 'block', fontWeight: 600 }}>
                {summary.totalSales} completed sales transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 1, borderLeft: '4px solid #7c3aed' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Catalog Products
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5 }}>
                    {summary.totalProducts}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(124, 58, 237, 0.1)', color: 'secondary.main' }}>
                  <Inventory2RoundedIcon />
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', mt: 1, display: 'block' }}>
                Supplied by {summary.totalSuppliers} verified vendors
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 1, borderLeft: `4px solid ${summary.lowStockCount > 0 ? '#f59e0b' : '#10b981'}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Low Stock Alerts
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: summary.lowStockCount > 0 ? '#b45309' : '#0f172a', mt: 0.5 }}>
                    {summary.lowStockCount}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: summary.lowStockCount > 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.1)', color: summary.lowStockCount > 0 ? 'warning.main' : 'success.main' }}>
                  <WarningAmberRoundedIcon />
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: summary.outOfStockCount > 0 ? '#ef4444' : '#64748b', mt: 1, display: 'block', fontWeight: summary.outOfStockCount > 0 ? 700 : 400 }}>
                {summary.outOfStockCount} items completely out of stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Analytics Visualization Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  7-Day Sales Trajectory
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Daily recorded revenue across POS checkout lines
                </Typography>
              </Box>
              <Chip label="Live Data" size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
            </Box>

            <Box sx={{ mt: 3, pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 180, px: 2, borderBottom: '1px solid #e2e8f0', gap: 2 }}>
                {salesTrend.map((item: any, idx: number) => {
                  const heightPct = Math.max((item.revenue / maxRevenue) * 100, 6);
                  return (
                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', mb: 0.5, fontSize: '0.72rem' }}>
                        ${item.revenue}
                      </Typography>
                      <Box
                        sx={{
                          width: '100%',
                          maxWidth: 36,
                          height: `${heightPct}%`,
                          borderRadius: '6px 6px 0 0',
                          background: item.revenue > 0 ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' : '#e2e8f0',
                          transition: 'height 0.4s ease',
                          '&:hover': {
                            background: 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)',
                          },
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, mt: 1 }}>
                {salesTrend.map((item: any, idx: number) => (
                  <Typography key={idx} variant="caption" sx={{ color: '#64748b', fontWeight: 600, flex: 1, textAlign: 'center' }}>
                    {item.date}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Top Stocked Products
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Highest volume products currently taking shelf space
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {topStockProducts.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#94a3b8', py: 4, textAlign: 'center' }}>
                  No inventory products recorded yet.
                </Typography>
              ) : (
                topStockProducts.map((p: any, idx: number) => {
                  const maxQty = topStockProducts[0]?.quantity || 1;
                  const pct = Math.round((p.quantity / maxQty) * 100);
                  return (
                    <Box key={idx}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          {p.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#2563eb' }}>
                          {p.quantity} units (${p.value.toFixed(2)})
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={pct}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#f1f5f9',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            bgcolor: idx === 0 ? '#2563eb' : idx === 1 ? '#7c3aed' : '#38bdf8',
                          },
                        }}
                      />
                    </Box>
                  );
                })
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Operational Sections */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningAmberRoundedIcon sx={{ color: '#f59e0b' }} />
                  Critical Stock Reorder List
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Items with 10 or fewer units in inventory
                </Typography>
              </Box>
              <Button size="small" variant="text" onClick={() => navigate('/products')}>
                View All
              </Button>
            </Box>

            {lowStockItems.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center', bgcolor: '#f0fdf4', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: '#16a34a', fontWeight: 600 }}>
                  ✓ All stock levels are healthy. No items under critical threshold.
                </Typography>
              </Box>
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Units Left</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lowStockItems.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                      <TableCell sx={{ color: '#64748b' }}>{item.sku}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${item.quantity} left`}
                          size="small"
                          color={item.quantity === 0 ? 'error' : 'warning'}
                          sx={{ fontWeight: 700 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          startIcon={<ReceiptLongRoundedIcon />}
                          onClick={() => navigate('/purchases')}
                        >
                          Reorder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recent Stock Movements
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Real-time warehouse check-ins and sales dispatches
                </Typography>
              </Box>
              <Button size="small" variant="text" onClick={() => navigate('/movements')}>
                Full Audit Log
              </Button>
            </Box>

            {recentMovements.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  No stock movements recorded yet.
                </Typography>
              </Box>
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Flow</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentMovements.slice(0, 5).map((m: any) => (
                    <TableRow key={m.id}>
                      <TableCell sx={{ color: '#64748b', fontSize: '0.8rem' }}>
                        {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={m.type === 'INBOUND' ? <ArrowDownwardRoundedIcon /> : <ArrowUpwardRoundedIcon />}
                          label={m.type}
                          size="small"
                          color={m.type === 'INBOUND' ? 'success' : 'error'}
                          variant="outlined"
                          sx={{ fontWeight: 700, fontSize: '0.72rem' }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{m.product?.name || `Item #${m.productId}`}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: m.type === 'INBOUND' ? '#16a34a' : '#dc2626' }}>
                        {m.type === 'INBOUND' ? `+${m.quantity}` : `-${m.quantity}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
