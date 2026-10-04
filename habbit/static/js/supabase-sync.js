/**
 * Supabase Synchronization Engine for HabitCraft Daily Tracking
 */
(function() {
  'use strict';

  const statusBadge = document.getElementById('supabaseStatusBadge');
  const cloudModal = document.getElementById('supabaseModal');
  const openModalBtn = document.getElementById('openSupabaseModalBtn');
  const closeModalBtn = document.getElementById('closeSupabaseModalBtn');
  const saveConfigBtn = document.getElementById('saveSupabaseConfigBtn');
  const testConnBtn = document.getElementById('testSupabaseConnBtn');
  const syncNowBtn = document.getElementById('syncSupabaseNowBtn');
  const inputUrl = document.getElementById('sbConfigUrl');
  const inputKey = document.getElementById('sbConfigKey');
  const testResultBox = document.getElementById('sbTestResult');

  // Populate modal inputs if present
  if (inputUrl && window.HABITCRAFT_SUPABASE_CONFIG) {
    inputUrl.value = window.HABITCRAFT_SUPABASE_CONFIG.url || '';
  }
  if (inputKey && window.HABITCRAFT_SUPABASE_CONFIG) {
    inputKey.value = window.HABITCRAFT_SUPABASE_CONFIG.publishableKey || '';
  }

  // Update Cloud Status Badge
  window.updateSupabaseStatus = function(state, message) {
    if (!statusBadge) return;
    if (state === 'connected') {
      statusBadge.innerHTML = `<span class="sb-dot-green"></span> Supabase: Synced`;
      statusBadge.className = 'sb-badge sb-badge-connected';
      statusBadge.title = message || 'Connected to Supabase cloud';
    } else if (state === 'syncing') {
      statusBadge.innerHTML = `<span class="sb-spinner"></span> Syncing...`;
      statusBadge.className = 'sb-badge sb-badge-syncing';
    } else if (state === 'error') {
      statusBadge.innerHTML = `<span class="sb-dot-red"></span> Cloud Error`;
      statusBadge.className = 'sb-badge sb-badge-error';
      statusBadge.title = message || 'Supabase sync failed';
    } else {
      statusBadge.innerHTML = `<span class="sb-dot-yellow"></span> Local Mode`;
      statusBadge.className = 'sb-badge sb-badge-local';
      statusBadge.title = 'Operating locally via browser storage';
    }
  };

  // 1. Sync Single Daily Log Record to Supabase
  window.syncDailyLogToSupabase = async function(record) {
    const sb = window.getHabitCraftSupabase();
    if (!sb) {
      window.updateSupabaseStatus('local', 'Supabase client not initialized');
      return { success: false, reason: 'Client not initialized' };
    }

    try {
      window.updateSupabaseStatus('syncing');

      const payload = {
        id: record.id || ('rec_' + Date.now()),
        log_date: record.date || new Date().toISOString().slice(0, 10),
        user_email: record.user_email || 'anonymous',
        mood: record.mood || '🔥 Peak Energy',
        sleep_hours: parseFloat(record.sleep) || 7.5,
        water_liters: parseFloat(record.water) || 2.5,
        morning_reflection: record.morning || '',
        evening_reflection: record.evening || '',
        habit_score: record.habitScore || '',
        completed_habits: record.completedHabits || [],
        raw_data: record,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await sb
        .from('daily_habit_tracking')
        .upsert(payload, { onConflict: 'log_date' });

      if (error) {
        console.warn('Supabase upsert warning/error:', error.message);
        window.updateSupabaseStatus('error', error.message);
        return { success: false, error };
      }

      window.updateSupabaseStatus('connected', 'Saved to Supabase');
      return { success: true, data };
    } catch (err) {
      console.error('Supabase sync exception:', err);
      window.updateSupabaseStatus('error', err.message);
      return { success: false, error: err };
    }
  };

  // 2. Fetch All Tracking Records from Supabase
  window.fetchDailyLogsFromSupabase = async function() {
    const sb = window.getHabitCraftSupabase();
    if (!sb) return null;

    try {
      const { data, error } = await sb
        .from('daily_habit_tracking')
        .select('*')
        .order('log_date', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error:', error.message);
        return null;
      }

      if (Array.isArray(data)) {
        // Map database schema back to client record structure
        return data.map(row => ({
          id: row.id,
          date: row.log_date,
          timestamp: new Date(row.updated_at || row.created_at).toLocaleString(),
          mood: row.mood || 'Steady',
          sleep: row.sleep_hours || 7.5,
          water: row.water_liters || 2.5,
          morning: row.morning_reflection || '',
          evening: row.evening_reflection || '',
          habitScore: row.habit_score || 'N/A'
        }));
      }
      return null;
    } catch (err) {
      console.error('Supabase fetch exception:', err);
      return null;
    }
  };

  // 3. Delete Daily Log from Supabase
  window.deleteDailyLogFromSupabase = async function(logId, logDate) {
    const sb = window.getHabitCraftSupabase();
    if (!sb) return false;

    try {
      let query = sb.from('daily_habit_tracking').delete();
      if (logId) {
        query = query.eq('id', logId);
      } else if (logDate) {
        query = query.eq('log_date', logDate);
      }
      const { error } = await query;
      return !error;
    } catch (err) {
      console.error('Supabase delete exception:', err);
      return false;
    }
  };

  // 4. Test Supabase Connection & Table Existence
  window.testSupabaseConnection = async function() {
    const sb = window.getHabitCraftSupabase();
    if (!sb) {
      return { ok: false, message: 'Supabase credentials or client library are missing.' };
    }

    try {
      const { count, error } = await sb
        .from('daily_habit_tracking')
        .select('*', { count: 'exact', head: true });

      if (error) {
        // Table might not exist yet or permissions issue
        if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
          return { 
            ok: false, 
            message: 'Connected to Supabase, but the "daily_habit_tracking" table was not found. Please run the SQL schema in your Supabase SQL Editor.' 
          };
        }
        return { ok: false, message: `Supabase Error: ${error.message} (${error.code || ''})` };
      }

      return { 
        ok: true, 
        message: `Connection Successful! Found ${count !== null ? count : 0} cloud tracking records in table "daily_habit_tracking".` 
      };
    } catch (err) {
      return { ok: false, message: `Network/CORS error: ${err.message}` };
    }
  };

  // Modal & Configuration Events
  if (openModalBtn && cloudModal) {
    openModalBtn.addEventListener('click', () => {
      cloudModal.style.display = 'flex';
    });
  }

  if (closeModalBtn && cloudModal) {
    closeModalBtn.addEventListener('click', () => {
      cloudModal.style.display = 'none';
    });
  }

  if (cloudModal) {
    cloudModal.addEventListener('click', (e) => {
      if (e.target === cloudModal) cloudModal.style.display = 'none';
    });
  }

  if (saveConfigBtn) {
    saveConfigBtn.addEventListener('click', () => {
      const url = inputUrl.value.trim();
      const key = inputKey.value.trim();

      if (!url || !key) {
        alert('Please provide both Supabase URL and Publishable/Anon Key.');
        return;
      }

      localStorage.setItem('habitcraft_supabase_url', url);
      localStorage.setItem('habitcraft_supabase_key', key);

      window.HABITCRAFT_SUPABASE_CONFIG.url = url;
      window.HABITCRAFT_SUPABASE_CONFIG.publishableKey = key;
      window._habitcraftSupabaseInstance = null; // force recreation

      alert('Supabase configuration saved! Testing connection...');
      runConnectionTest();
    });
  }

  async function runConnectionTest() {
    if (!testResultBox) return;
    testResultBox.style.display = 'block';
    testResultBox.innerHTML = '<span class="sb-spinner"></span> Connecting to Supabase...';
    testResultBox.style.color = 'var(--text-muted)';

    const res = await window.testSupabaseConnection();
    if (res.ok) {
      testResultBox.style.color = 'var(--accent-success)';
      testResultBox.innerHTML = `✅ ${res.message}`;
      window.updateSupabaseStatus('connected');
    } else {
      testResultBox.style.color = 'var(--accent-rose)';
      testResultBox.innerHTML = `⚠️ ${res.message}`;
      window.updateSupabaseStatus('error', res.message);
    }
  }

  if (testConnBtn) {
    testConnBtn.addEventListener('click', runConnectionTest);
  }

  if (syncNowBtn) {
    syncNowBtn.addEventListener('click', async () => {
      syncNowBtn.disabled = true;
      syncNowBtn.innerHTML = '<span>⏳</span> Syncing...';

      // 1. Fetch cloud records and merge into local
      const cloudRecords = await window.fetchDailyLogsFromSupabase();
      if (cloudRecords && cloudRecords.length > 0) {
        let localLogs = [];
        try {
          localLogs = JSON.parse(localStorage.getItem('habitcraft_recorded_logs') || '[]');
        } catch (e) {}

        const datesMap = new Map();
        localLogs.forEach(l => datesMap.set(l.date, l));
        // Overwrite or append cloud logs
        cloudRecords.forEach(c => datesMap.set(c.date, c));

        const merged = Array.from(datesMap.values()).sort((a, b) => b.date.localeCompare(a.date));
        localStorage.setItem('habitcraft_recorded_logs', JSON.stringify(merged));
        
        // Re-render history if function exists
        if (typeof window.refreshHabitRecordsFeed === 'function') {
          window.refreshHabitRecordsFeed();
        }
      }

      // 2. Push any local-only logs to Supabase
      try {
        const localLogs = JSON.parse(localStorage.getItem('habitcraft_recorded_logs') || '[]');
        for (const log of localLogs) {
          await window.syncDailyLogToSupabase(log);
        }
      } catch (e) {}

      syncNowBtn.disabled = false;
      syncNowBtn.innerHTML = '<span>☁️</span> Sync Local & Cloud Records';
      alert('Cloud and local records synchronized!');
    });
  }

  // Initial auto-test in background
  setTimeout(async () => {
    const res = await window.testSupabaseConnection();
    if (res.ok) {
      window.updateSupabaseStatus('connected');
    } else {
      window.updateSupabaseStatus('local');
    }
  }, 500);

})();
