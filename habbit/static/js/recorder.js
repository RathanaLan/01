/**
 * HabitCraft Recorder Suite
 * - Daily Habit & Reflection Log Recorder (Persistent Storage & History)
 * - Voice Reflection & Audio Memo Recorder (MediaRecorder API)
 */
(function() {
  'use strict';

  /* =========================================================================
   * 1. RECORDER TAB SWITCHER
   * ========================================================================= */
  const recordTabBtns = document.querySelectorAll('.record-tab-btn');
  const recordTabPanels = document.querySelectorAll('.record-tab-panel');

  recordTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      recordTabBtns.forEach(b => b.classList.remove('active'));
      recordTabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  /* =========================================================================
   * 2. DAILY LOG & HABIT JOURNAL RECORDER
   * ========================================================================= */
  const logDateInput = document.getElementById('logDateInput');
  const logSleepInput = document.getElementById('logSleepInput');
  const logWaterInput = document.getElementById('logWaterInput');
  const logMorningText = document.getElementById('logMorningText');
  const logEveningText = document.getElementById('logEveningText');
  const saveDailyLogBtn = document.getElementById('saveDailyLogBtn');
  const historyContainer = document.getElementById('recordsHistoryList');
  const exportLogsBtn = document.getElementById('exportLogsBtn');
  const clearAllLogsBtn = document.getElementById('clearAllLogsBtn');
  const moodPills = document.querySelectorAll('.mood-pill');

  let selectedMood = '🔥 Peak';

  // Set default date to today in YYYY-MM-DD format
  if (logDateInput) {
    const todayStr = new Date().toISOString().slice(0, 10);
    logDateInput.value = todayStr;
  }

  moodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      moodPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedMood = pill.dataset.mood;
    });
  });

  function getHabitStats() {
    const habitItems = document.querySelectorAll('.habit-item');
    const total = habitItems.length;
    const completed = document.querySelectorAll('.habit-item.is-completed').length;
    return {
      total,
      completed,
      pct: total === 0 ? 0 : Math.round((completed / total) * 100)
    };
  }

  function getStoredLogs() {
    try {
      return JSON.parse(localStorage.getItem('habitcraft_recorded_logs') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveStoredLogs(logs) {
    localStorage.setItem('habitcraft_recorded_logs', JSON.stringify(logs));
    renderHistory();
  }

  function saveCurrentLog() {
    const date = logDateInput ? logDateInput.value : new Date().toISOString().slice(0, 10);
    const sleep = logSleepInput ? logSleepInput.value : '7.5';
    const water = logWaterInput ? logWaterInput.value : '2.5';
    const morning = logMorningText ? logMorningText.value.trim() : '';
    const evening = logEveningText ? logEveningText.value.trim() : '';
    const habitStats = getHabitStats();

    if (!morning && !evening) {
      alert('Please write at least one morning or evening reflection note before recording.');
      return;
    }

    const newRecord = {
      id: 'rec_' + Date.now(),
      date,
      timestamp: new Date().toLocaleString(),
      mood: selectedMood,
      sleep: parseFloat(sleep) || 7.5,
      water: parseFloat(water) || 2.5,
      morning,
      evening,
      habitScore: `${habitStats.completed}/${habitStats.total} (${habitStats.pct}%)`
    };

    let logs = getStoredLogs();
    // Replace if record for this date already exists or prepend
    const existingIdx = logs.findIndex(l => l.date === date);
    if (existingIdx >= 0) {
      logs[existingIdx] = newRecord;
    } else {
      logs.unshift(newRecord);
    }

    saveStoredLogs(logs);

    // Sync to Supabase cloud in the background
    if (typeof window.syncDailyLogToSupabase === 'function') {
      window.syncDailyLogToSupabase(newRecord).then(res => {
        if (res && res.success) {
          console.log('Record synced to Supabase table:', res);
        }
      });
    }

    // Show visual confirmation
    if (saveDailyLogBtn) {
      const originalText = saveDailyLogBtn.innerHTML;
      saveDailyLogBtn.innerHTML = '<span>✅</span> Recorded & Synced!';
      saveDailyLogBtn.classList.remove('btn-primary');
      saveDailyLogBtn.classList.add('btn-secondary');
      setTimeout(() => {
        saveDailyLogBtn.innerHTML = originalText;
        saveDailyLogBtn.classList.remove('btn-secondary');
        saveDailyLogBtn.classList.add('btn-primary');
      }, 2000);
    }
  }

  if (saveDailyLogBtn) {
    saveDailyLogBtn.addEventListener('click', saveCurrentLog);
  }

  function renderHistory() {
    if (!historyContainer) return;
    const logs = getStoredLogs();

    if (logs.length === 0) {
      historyContainer.innerHTML = `
        <div style="text-align: center; padding: 36px 20px; color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">📖</div>
          <p>No daily records logged yet. Fill out today's reflection above and click <strong>Record Daily Log</strong>!</p>
        </div>
      `;
      return;
    }

    historyContainer.innerHTML = logs.map(item => `
      <div class="record-history-card">
        <div class="record-card-header">
          <div>
            <span class="record-date-badge">📅 ${item.date}</span>
            <span class="record-mood-badge">${item.mood}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.8rem; color: var(--text-subtle);">${item.timestamp}</span>
            <button class="delete-record-btn" data-id="${item.id}" title="Delete Record">✕</button>
          </div>
        </div>

        <div class="record-metrics-row">
          <span>💧 Water: <strong>${item.water}L</strong></span>
          <span>🌙 Sleep: <strong>${item.sleep} hrs</strong></span>
          <span>⚡ Habits: <strong>${item.habitScore}</strong></span>
        </div>

        ${item.morning ? `
          <div class="record-quote-box">
            <strong>🌅 Morning Intention & MITs:</strong>
            <p>${escapeHTML(item.morning)}</p>
          </div>
        ` : ''}

        ${item.evening ? `
          <div class="record-quote-box" style="border-left-color: var(--accent-purple);">
            <strong>🌙 Evening Wins & Reflection:</strong>
            <p>${escapeHTML(item.evening)}</p>
          </div>
        ` : ''}
      </div>
    `).join('');

    // Attach delete handlers
    document.querySelectorAll('.delete-record-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const targetLog = getStoredLogs().find(l => l.id === id);
        if (confirm('Delete this recorded entry?')) {
          let updated = getStoredLogs().filter(l => l.id !== id);
          saveStoredLogs(updated);
          if (typeof window.deleteDailyLogFromSupabase === 'function' && targetLog) {
            window.deleteDailyLogFromSupabase(id, targetLog.date);
          }
        }
      });
    });
  }

  // Expose render function for Supabase cloud sync
  window.refreshHabitRecordsFeed = renderHistory;

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  if (clearAllLogsBtn) {
    clearAllLogsBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all recorded history logs? This cannot be undone.')) {
        localStorage.removeItem('habitcraft_recorded_logs');
        renderHistory();
      }
    });
  }

  if (exportLogsBtn) {
    exportLogsBtn.addEventListener('click', () => {
      const logs = getStoredLogs();
      if (logs.length === 0) {
        alert('No records available to export.');
        return;
      }
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `habitcraft_records_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  renderHistory();

  /* =========================================================================
   * 3. VOICE REFLECTION & AUDIO MEMO RECORDER (MIC RECORDING)
   * ========================================================================= */
  const recordVoiceBtn = document.getElementById('recordVoiceBtn');
  const stopVoiceBtn = document.getElementById('stopVoiceBtn');
  const voiceTimerDisplay = document.getElementById('voiceTimerDisplay');
  const voiceWavePulse = document.getElementById('voiceWavePulse');
  const audioPreviewContainer = document.getElementById('audioPreviewContainer');
  const voiceMemosList = document.getElementById('voiceMemosList');

  let mediaRecorder = null;
  let audioChunks = [];
  let recordTimerInterval = null;
  let recordingSeconds = 0;

  function formatAudioDuration(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  if (recordVoiceBtn) {
    recordVoiceBtn.addEventListener('click', async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Audio recording is not supported in this browser or requires a secure context (HTTPS/localhost).');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunks = [];
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop());
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          handleRecordingFinished(audioBlob, audioUrl, recordingSeconds);
        };

        mediaRecorder.start();
        recordingSeconds = 0;
        if (voiceTimerDisplay) voiceTimerDisplay.textContent = '00:00';
        recordTimerInterval = setInterval(() => {
          recordingSeconds++;
          if (voiceTimerDisplay) voiceTimerDisplay.textContent = formatAudioDuration(recordingSeconds);
        }, 1000);

        // UI state: Recording active
        recordVoiceBtn.style.display = 'none';
        if (stopVoiceBtn) stopVoiceBtn.style.display = 'inline-flex';
        if (voiceWavePulse) voiceWavePulse.classList.add('is-recording');

      } catch (err) {
        console.error('Microphone access error:', err);
        alert('Microphone access was denied or is unavailable. Please grant microphone permission to record audio reflections.');
      }
    });
  }

  if (stopVoiceBtn) {
    stopVoiceBtn.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        clearInterval(recordTimerInterval);

        // UI state: Stopped
        stopVoiceBtn.style.display = 'none';
        if (recordVoiceBtn) recordVoiceBtn.style.display = 'inline-flex';
        if (voiceWavePulse) voiceWavePulse.classList.remove('is-recording');
      }
    });
  }

  function handleRecordingFinished(blob, url, durationSecs) {
    const timeFormatted = formatAudioDuration(durationSecs);
    const recordedDate = new Date().toLocaleDateString();
    const recordedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (audioPreviewContainer) {
      audioPreviewContainer.innerHTML = `
        <div class="audio-memo-item" style="border-color: var(--accent-success); background: rgba(16, 185, 129, 0.08);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: 700; color: var(--accent-success); font-size: 0.9rem;">🎙️ Latest Voice Note (${timeFormatted})</span>
            <a href="${url}" download="reflection_${Date.now()}.webm" class="btn-secondary" style="font-size: 0.78rem; padding: 4px 10px; text-decoration: none;">Download Audio</a>
          </div>
          <audio controls src="${url}" style="width: 100%; height: 40px; margin-top: 4px;"></audio>
        </div>
      `;
    }

    // Add to saved voice memos in DOM
    if (voiceMemosList) {
      const memoCard = document.createElement('div');
      memoCard.className = 'audio-memo-item';
      memoCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div>
            <strong style="font-size: 0.92rem;">Voice Reflection • ${recordedDate} ${recordedTime}</strong>
            <span style="font-size: 0.78rem; color: var(--text-muted); display: block;">Duration: ${timeFormatted}</span>
          </div>
          <a href="${url}" download="voice_memo_${Date.now()}.webm" class="btn-secondary" style="font-size: 0.75rem; padding: 4px 8px; text-decoration: none;">Download</a>
        </div>
        <audio controls src="${url}" style="width: 100%; height: 36px;"></audio>
      `;
      voiceMemosList.prepend(memoCard);
    }
  }

})();
