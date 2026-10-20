/**
 * Financial Formatting Utilities
 */

export const formatPrice = (value, decimals = 2) => {
  if (value === undefined || value === null || isNaN(value)) return '$0.00';
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (num === 0) return '$0.00';
  if (num < 0.00001) return `$${num.toFixed(8)}`;
  if (num < 0.001) return `$${num.toFixed(6)}`;
  if (num < 1) return `$${num.toFixed(4)}`;
  if (num < 10) return `$${num.toFixed(Math.max(2, decimals))}`;

  const maxDec = Math.max(2, Math.min(8, decimals));
  const minDec = Math.min(2, maxDec);

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: minDec,
      maximumFractionDigits: maxDec
    }).format(num);
  } catch (err) {
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

export const formatPercent = (value) => {
  if (value === undefined || value === null || isNaN(value)) return '0.00%';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
};

export const formatNumber = (value, decimals = 4) => {
  if (value === undefined || value === null || isNaN(value)) return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  try {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimals
    }).format(num);
  } catch (err) {
    return num.toFixed(decimals);
  }
};

export const formatTime = (timestamp) => {
  if (!timestamp) return '--:--:--';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour12: false });
};

export const formatDate = (timestamp) => {
  if (!timestamp) return '--';
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};
