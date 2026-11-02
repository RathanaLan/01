/**
 * ============================================================================
 * POWER APPS MASTER PRESENTATION ENGINE (COMMON FOR ALL LESSONS)
 * Universal Presentation Engine for Day 1 through Day 27
 * Location: /shared/engine.js
 * ============================================================================
 */

(function () {
  'use strict';

  // State Management
  let currentSlideIndex = 0;
  let slides = [];
  let totalSlides = 0;

  // 90-Minute Agenda Activity Timer
  let timerSecondsElapsed = 0;
  let timerInterval = null;
  let isTimerRunning = false;
  const TOTAL_SESSION_SECONDS = 90 * 60; // 90 minutes

  // Presenter Notes
  let isNotesOpen = false;

  // Bilingual Mode State
  let isKhmerActive = false;

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  function initPresentationEngine() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    // Slide Total Count in Footer
    const totalCountElem = document.getElementById('slide-total-num');
    if (totalCountElem) totalCountElem.textContent = String(totalSlides);

    // Bind Core UI Listeners
    bindNavigationEvents();
    bindTimerControls();
    bindPresenterNotes();
    bindOverviewModal();
    bindGoogleTranslate();

    // Universal Interactive Handlers for All Lessons
    bindQuizInteractions();
    bindClassifierInteractions();
    bindConditionInteractions();
    bindRevealInteractions();
    bindSequencerInteractions();
    bindDay1Widgets();

    // Setup slide-level pre-rendered notes for 100% reliable translation
    prepareSlideNotesDOM();

    // Start on first slide
    goToSlide(0);

    console.log(`[Master Engine] Initialized presentation with ${totalSlides} slides.`);
  }

  // --------------------------------------------------------------------------
  // Slide-Level Notes Translation Enhancement
  // --------------------------------------------------------------------------
  function prepareSlideNotesDOM() {
    // If slide has data-notes but lacks an in-DOM .slide-notes-content container,
    // generate it so Google Translate can translate it upfront on page load!
    slides.forEach(slide => {
      let notesContainer = slide.querySelector('.slide-notes-content');
      if (!notesContainer) {
        const rawNotes = slide.getAttribute('data-notes');
        if (rawNotes) {
          notesContainer = document.createElement('div');
          notesContainer.className = 'slide-notes-content';
          notesContainer.style.display = 'none';
          notesContainer.innerHTML = rawNotes
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => `<p>${line}</p>`)
            .join('');
          slide.appendChild(notesContainer);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // Slide Navigation
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlideIndex = index;

    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'slide-prev', 'slide-next');
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else if (idx < currentSlideIndex) {
        slide.classList.add('slide-prev');
      } else {
        slide.classList.add('slide-next');
      }
    });

    const activeSlide = slides[currentSlideIndex];

    // Update Header Titles
    const slideTitle = activeSlide.getAttribute('data-title') || `Slide ${currentSlideIndex + 1}`;
    const segmentName = activeSlide.getAttribute('data-segment') || 'Power Apps Foundation';

    const headerTitleElem = document.getElementById('current-slide-title');
    if (headerTitleElem) headerTitleElem.textContent = slideTitle;

    const segmentBadgeElem = document.getElementById('current-segment-name');
    if (segmentBadgeElem) segmentBadgeElem.textContent = segmentName;

    // Update Footer Counter
    const currentNumElem = document.getElementById('slide-current-num');
    if (currentNumElem) currentNumElem.textContent = String(currentSlideIndex + 1);

    // Update Progress Scrub Line
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const percentage = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${percentage}%`;
    }

    // Synchronize Presenter Notes
    updatePresenterNotesContent(activeSlide);
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  function bindNavigationEvents() {
    // Footer Controls (Centered Next / Prev)
    document.getElementById('btn-next')?.addEventListener('click', nextSlide);
    document.getElementById('btn-prev')?.addEventListener('click', prevSlide);
    document.getElementById('btn-restart')?.addEventListener('click', () => goToSlide(0));

    // Progress Scrub Line Click
    const progressTrack = document.getElementById('progress-track');
    progressTrack?.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickRatio = (e.clientX - rect.left) / rect.width;
      const targetSlide = Math.min(Math.floor(clickRatio * totalSlides), totalSlides - 1);
      goToSlide(targetSlide);
    });

    // Fullscreen Toggle
    document.getElementById('btn-fullscreen')?.addEventListener('click', toggleFullscreen);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.code) {
        case 'ArrowRight':
        case 'Space':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyN':
          e.preventDefault();
          togglePresenterNotes();
          break;
        case 'KeyO':
          e.preventDefault();
          toggleOverviewModal();
          break;
        case 'KeyR':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'KeyL':
          e.preventDefault();
          triggerGoogleTranslate();
          break;
      }
    });
  }

  // --------------------------------------------------------------------------
  // Presenter Notes (Hide / Unhide & Translation-Safe Display)
  // --------------------------------------------------------------------------
  function togglePresenterNotes(forceState) {
    const notesPanel = document.getElementById('presenter-notes-panel');
    const notesBtn = document.getElementById('btn-notes');
    const floatingTab = document.getElementById('notes-floating-tab');
    if (!notesPanel) return;

    const isCurrentlyOpen = notesPanel.classList.contains('open');
    const shouldOpen = (typeof forceState === 'boolean') ? forceState : !isCurrentlyOpen;

    if (shouldOpen) {
      notesPanel.classList.add('open');
      notesBtn?.classList.add('active-notes');
      floatingTab?.classList.add('panel-is-open');
      if (floatingTab) {
        const text = floatingTab.querySelector('.tab-text');
        if (text) text.textContent = 'Hide Notes';
      }
      isNotesOpen = true;
    } else {
      notesPanel.classList.remove('open');
      notesBtn?.classList.remove('active-notes');
      floatingTab?.classList.remove('panel-is-open');
      if (floatingTab) {
        const text = floatingTab.querySelector('.tab-text');
        if (text) text.textContent = 'Notes';
      }
      isNotesOpen = false;
    }
  }

  window.togglePresenterNotes = togglePresenterNotes;

  function updatePresenterNotesContent(slideElement) {
    const notesContentElem = document.getElementById('notes-content');
    const notesSegmentElem = document.getElementById('notes-segment-label');
    if (!notesContentElem) return;

    const segment = slideElement.getAttribute('data-segment') || 'Part 1';
    if (notesSegmentElem) notesSegmentElem.textContent = segment;

    // Check if in-DOM notes container exists (already translated by Google Translate!)
    const inDomNotes = slideElement.querySelector('.slide-notes-content');
    if (inDomNotes && inDomNotes.innerHTML.trim().length > 0) {
      notesContentElem.innerHTML = inDomNotes.innerHTML;
    } else {
      const rawNotes = slideElement.getAttribute('data-notes') || 'No trainer speaking script recorded for this slide.';
      notesContentElem.innerHTML = rawNotes
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => `<p>${line}</p>`)
        .join('');
    }
  }

  function bindPresenterNotes() {
    document.getElementById('btn-notes')?.addEventListener('click', () => togglePresenterNotes());
    document.getElementById('notes-close-btn')?.addEventListener('click', () => togglePresenterNotes(false));
    document.getElementById('notes-floating-tab')?.addEventListener('click', () => togglePresenterNotes());
  }

  // --------------------------------------------------------------------------
  // Slide Overview Grid Modal
  // --------------------------------------------------------------------------
  function toggleOverviewModal() {
    const modal = document.getElementById('overview-modal');
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
      buildOverviewGrid();
      modal.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
    }
  }

  function buildOverviewGrid() {
    const container = document.getElementById('overview-grid-container');
    if (!container) return;

    container.innerHTML = '';
    slides.forEach((slide, index) => {
      const title = slide.getAttribute('data-title') || `Slide ${index + 1}`;
      const thumb = document.createElement('div');
      thumb.className = `overview-thumbnail ${index === currentSlideIndex ? 'active-thumb' : ''}`;
      thumb.innerHTML = `
        <span class="thumb-num">SLIDE ${index + 1}</span>
        <span class="thumb-title">${title}</span>
      `;
      thumb.addEventListener('click', () => {
        goToSlide(index);
        toggleOverviewModal();
      });
      container.appendChild(thumb);
    });
  }

  function bindOverviewModal() {
    document.getElementById('btn-overview')?.addEventListener('click', toggleOverviewModal);
    document.getElementById('overview-close-btn')?.addEventListener('click', toggleOverviewModal);
  }

  // --------------------------------------------------------------------------
  // Activity Timer (90 Minutes)
  // --------------------------------------------------------------------------
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    const display = document.getElementById('session-timer');
    if (display) display.textContent = formatTime(timerSecondsElapsed);
  }

  function toggleTimer() {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      updateTimerButtonIcon(false);
    } else {
      timerInterval = setInterval(() => {
        if (timerSecondsElapsed < TOTAL_SESSION_SECONDS) {
          timerSecondsElapsed++;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          updateTimerButtonIcon(false);
        }
      }, 1000);
      isTimerRunning = true;
      updateTimerButtonIcon(true);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerSecondsElapsed = 0;
    updateTimerDisplay();
    updateTimerButtonIcon(false);
  }

  function updateTimerButtonIcon(running) {
    const icon = document.getElementById('timer-icon');
    if (!icon) return;
    if (running) {
      icon.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
    } else {
      icon.innerHTML = '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
    }
  }

  function bindTimerControls() {
    document.getElementById('timer-toggle-btn')?.addEventListener('click', toggleTimer);
    document.getElementById('timer-reset-btn')?.addEventListener('click', resetTimer);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  // --------------------------------------------------------------------------
  // Google Translate & Bilingual Switcher
  // --------------------------------------------------------------------------
  function triggerGoogleTranslate() {
    const targetLang = isKhmerActive ? 'en' : 'km';
    const langBtnText = document.getElementById('lang-btn-text');

    // 1. Update Cookie
    const cookieVal = `/en/${targetLang}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`;

    // 2. Trigger Google Combo Box
    const selectElem = document.querySelector('.goog-te-combo');
    if (selectElem) {
      selectElem.value = targetLang;
      selectElem.dispatchEvent(new Event('change'));
    }

    // 3. Toggle Khmer Font Classes
    if (targetLang === 'km') {
      isKhmerActive = true;
      document.body.classList.add('khmer-mode');
      if (langBtnText) langBtnText.textContent = '🇬🇧 English';
    } else {
      isKhmerActive = false;
      document.body.classList.remove('khmer-mode');
      if (langBtnText) langBtnText.textContent = '🇰🇭 ខ្មែរ (Khmer)';
    }

    suppressGoogleTranslateBanners();
  }

  function suppressGoogleTranslateBanners() {
    document.body.style.top = '0px';
    document.body.style.position = 'static';
    document.documentElement.style.top = '0px';

    const elementsToHide = document.querySelectorAll(
      '.VIpgJd-ZVi9od-ORHb-OEVmcd, .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame'
    );
    elementsToHide.forEach(el => {
      el.style.display = 'none';
      el.style.height = '0px';
      el.style.visibility = 'hidden';
    });
  }

  function bindGoogleTranslate() {
    document.getElementById('btn-lang')?.addEventListener('click', triggerGoogleTranslate);

    // Continuous banner prevention
    const observer = new MutationObserver(() => {
      suppressGoogleTranslateBanners();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  // --------------------------------------------------------------------------
  // Universal Interactive Handlers for All Lessons
  // --------------------------------------------------------------------------

  // 1. Universal Knowledge Check / Quiz Options
  function bindQuizInteractions() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-option-btn');
      if (!btn) return;

      const parentList = btn.closest('.quiz-options-list') || btn.parentElement;
      const card = btn.closest('.quiz-widget-card') || btn.closest('.slide');
      const isCorrect = btn.getAttribute('data-correct') === 'true';

      // Clear previous states in this question group
      parentList.querySelectorAll('.quiz-option-btn').forEach(b => {
        b.classList.remove('correct', 'wrong');
      });

      if (isCorrect) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }

      // Show feedback box if available
      const feedbackBox = card ? card.querySelector('.quiz-feedback-box') : null;
      if (feedbackBox) {
        feedbackBox.classList.remove('hidden');
        const customExp = btn.getAttribute('data-explanation');
        if (customExp) {
          feedbackBox.innerHTML = customExp;
        }
      }
    });
  }

  // 2. Universal Data Type Classifier (Day 3 & Practice Cards)
  function bindClassifierInteractions() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.classifier-btn');
      if (!btn) return;

      const card = btn.closest('.classifier-item-card');
      if (!card) return;

      const selectedType = btn.getAttribute('data-type');
      const correctType = card.getAttribute('data-correct-type');
      const isMatch = (selectedType && correctType && selectedType.trim().toLowerCase() === correctType.trim().toLowerCase());

      card.querySelectorAll('.classifier-btn').forEach(b => {
        b.classList.remove('correct-choice', 'wrong-choice');
      });

      const feedbackElem = card.querySelector('.classifier-feedback') || card.querySelector('.classifier-status');

      if (isMatch) {
        btn.classList.add('correct-choice');
        card.classList.add('classified-correct');
        if (feedbackElem) {
          feedbackElem.textContent = `✓ Correct! ${card.getAttribute('data-explanation') || ''}`;
          feedbackElem.style.color = '#8ce68c';
        }
      } else {
        btn.classList.add('wrong-choice');
        card.classList.remove('classified-correct');
        if (feedbackElem) {
          feedbackElem.textContent = `Try again: Remember its true purpose!`;
          feedbackElem.style.color = '#ff8e8e';
        }
      }
    });
  }

  // 3. Universal Condition Evaluator (Day 4: True / False)
  function bindConditionInteractions() {
    document.addEventListener('click', (e) => {
      // Handle condition case cards (e.g. 6 conditions challenge)
      const toggleBtn = e.target.closest('.condition-toggle-btn');
      if (toggleBtn) {
        const card = toggleBtn.closest('.condition-case-card');
        if (!card) return;

        const pickedVal = toggleBtn.getAttribute('data-val');
        const correctVal = card.getAttribute('data-correct-answer');
        const isCorrect = (pickedVal && correctVal && pickedVal.trim().toLowerCase() === correctVal.trim().toLowerCase());

        card.querySelectorAll('.condition-toggle-btn').forEach(b => {
          b.classList.remove('btn-picked-correct', 'btn-picked-wrong');
        });

        const explanationElem = card.querySelector('.condition-explanation');

        if (isCorrect) {
          toggleBtn.classList.add('btn-picked-correct');
          card.classList.add('solved-correct');
          if (explanationElem) {
            explanationElem.innerHTML = `<span style="color: #8ce68c;">✓ Correct!</span> ${card.getAttribute('data-reason') || ''}`;
          }
        } else {
          toggleBtn.classList.add('btn-picked-wrong');
          card.classList.remove('solved-correct');
          if (explanationElem) {
            explanationElem.innerHTML = `<span style="color: #ff8e8e;">Try again:</span> Evaluate the math carefully!`;
          }
        }
      }

      // Handle single big condition tester button
      const evalChoiceBtn = e.target.closest('.btn-eval-choice');
      if (evalChoiceBtn) {
        const tester = evalChoiceBtn.closest('.condition-tester-card');
        if (!tester) return;

        const picked = evalChoiceBtn.getAttribute('data-eval');
        const correct = tester.getAttribute('data-correct-eval');
        const isMatch = (picked === correct);

        tester.querySelectorAll('.btn-eval-choice').forEach(b => {
          b.classList.remove('eval-selected-correct', 'eval-selected-wrong');
        });

        const feedback = tester.querySelector('.condition-tester-feedback');
        if (isMatch) {
          evalChoiceBtn.classList.add('eval-selected-correct');
          if (feedback) {
            feedback.classList.remove('hidden');
            feedback.innerHTML = `<span style="color: #8ce68c; font-weight: 700;">✓ Correct!</span> ${tester.getAttribute('data-explanation') || ''}`;
          }
        } else {
          evalChoiceBtn.classList.add('eval-selected-wrong');
          if (feedback) {
            feedback.classList.remove('hidden');
            feedback.innerHTML = `<span style="color: #ff8e8e; font-weight: 700;">Not quite:</span> Check if the condition statement is true in reality!`;
          }
        }
      }
    });
  }

  // 4. Universal Reveal Buttons
  function bindRevealInteractions() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.reveal-trigger') || e.target.closest('.btn-reveal-solution') || e.target.closest('.btn-reveal-answer');
      if (!btn) return;

      const targetSelector = btn.getAttribute('data-target');
      let targetElem = targetSelector ? document.querySelector(targetSelector) : null;

      if (!targetElem) {
        const card = btn.closest('.slide') || document;
        targetElem = card.querySelector('.challenge-solution-card') || card.querySelector('.revealed-content');
      }

      if (targetElem) {
        targetElem.classList.toggle('hidden');
        const isNowHidden = targetElem.classList.contains('hidden');
        btn.textContent = isNowHidden ? '👁️ Reveal Solution & Answers' : '🔒 Hide Solution';
      }
    });
  }

  // 5. Sequencer Interactions (Day 2)
  function bindSequencerInteractions() {
    let selectedItem = null;
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.seq-drag-item');
      if (item && !item.classList.contains('placed')) {
        document.querySelectorAll('.seq-drag-item').forEach(i => i.style.outline = 'none');
        selectedItem = item;
        item.style.outline = '2px solid var(--fluent-blue)';
        return;
      }

      const slot = e.target.closest('.seq-slot');
      if (slot && selectedItem) {
        const slotStep = slot.getAttribute('data-step');
        const itemStep = selectedItem.getAttribute('data-step');

        if (slotStep === itemStep) {
          slot.classList.add('correct-slot');
          const content = slot.querySelector('.slot-content');
          if (content) content.textContent = selectedItem.textContent.trim();
          selectedItem.classList.add('placed');
          selectedItem.style.outline = 'none';
          selectedItem = null;

          const slots = document.querySelectorAll('.seq-slot');
          const allFilled = Array.from(slots).every(s => s.classList.contains('correct-slot'));
          const banner = document.getElementById('seq-feedback-banner');
          if (banner && allFilled) {
            banner.className = 'seq-feedback-banner success';
            banner.innerHTML = '<strong>&#10004; Excellent Sequence!</strong> Machine is safe to start!';
          }
        } else {
          slot.style.borderColor = 'var(--fluent-red)';
          setTimeout(() => { slot.style.borderColor = ''; }, 600);
        }
      }
    });
  }

  // 6. Day 1 Interactive Widgets (Calculator & Attendance)
  function bindDay1Widgets() {
    let currentCalc = '0';
    document.addEventListener('click', (e) => {
      const calcBtn = e.target.closest('.calc-btn');
      if (calcBtn) {
        const screen = document.getElementById('calc-screen');
        const val = calcBtn.getAttribute('data-val');
        if (!screen || !val) return;

        if (val === 'C') {
          currentCalc = '0';
        } else if (val === '=') {
          try {
            currentCalc = String(eval(currentCalc.replace(/[^-()\d/*+.]/g, '')));
          } catch {
            currentCalc = 'Error';
          }
        } else {
          if (currentCalc === '0' && !isNaN(val)) {
            currentCalc = val;
          } else {
            currentCalc += val;
          }
        }
        screen.textContent = currentCalc;
      }

      const clockInBtn = e.target.closest('#btn-kiosk-clockin');
      if (clockInBtn) {
        const output = document.getElementById('kiosk-output');
        if (output) {
          output.classList.remove('hidden');
          output.innerHTML = '✅ <strong>WELCOME, OPERATOR!</strong><br>Clock-in recorded at ' + new Date().toLocaleTimeString();
        }
      }
    });
  }

  // Bootstrap Engine on DOM Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentationEngine);
  } else {
    initPresentationEngine();
  }

  // Export Engine to Global Scope for Custom Widget Handlers
  window.PresentationEngine = {
    goToSlide,
    nextSlide,
    prevSlide,
    togglePresenterNotes,
    toggleOverviewModal,
    toggleFullscreen,
    triggerGoogleTranslate
  };

})();
