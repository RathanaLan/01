/**
 * Supabase Client Configuration for HabitCraft Daily Tracking
 */
(function() {
  'use strict';

  // Read existing workspace config if present
  const workspaceConfig = window.PORTFOLIO_SUPABASE_CONFIG || {};

  const savedUrl = localStorage.getItem('habitcraft_supabase_url');
  const savedKey = localStorage.getItem('habitcraft_supabase_key');

  const defaultUrl = savedUrl || workspaceConfig.url || "https://dgehlxhbggqxiznsryrv.supabase.co";
  const defaultKey = savedKey || workspaceConfig.publishableKey || "sb_publishable_0r0SqqjiXg8KGQVqQZM0TQ_KuCheFqj";

  window.HABITCRAFT_SUPABASE_CONFIG = {
    url: defaultUrl,
    publishableKey: defaultKey,
    tableName: 'daily_habit_tracking'
  };

  // Helper to reinitialize or get the Supabase Client
  window.getHabitCraftSupabase = function() {
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      console.warn('Supabase JS library is not loaded.');
      return null;
    }
    const cfg = window.HABITCRAFT_SUPABASE_CONFIG;
    if (!cfg.url || !cfg.publishableKey) {
      return null;
    }
    try {
      if (!window._habitcraftSupabaseInstance) {
        window._habitcraftSupabaseInstance = window.supabase.createClient(cfg.url, cfg.publishableKey);
      }
      return window._habitcraftSupabaseInstance;
    } catch (e) {
      console.error('Failed to initialize Supabase client:', e);
      return null;
    }
  };
})();
