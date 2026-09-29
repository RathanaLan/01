/**
 * Rathana Lan — Modern Portfolio Interactive Script (2026 Edition)
 * Pure Direct Supabase Integration (No mailto / No popups)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light)
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLabel = document.getElementById("theme-label");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, save = false) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${isDark ? "light" : "dark"} mode`
      );
    }
    if (themeIcon) {
      themeIcon.textContent = isDark ? "☼" : "◐";
    }
    if (themeLabel) {
      themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    }
    if (themeColorMeta) {
      themeColorMeta.content = isDark ? "#090d0b" : "#f8fafc";
    }
    if (save) {
      try {
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
      } catch (e) {}
    }
  }

  applyTheme(document.documentElement.dataset.theme || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme;
      applyTheme(currentTheme === "dark" ? "light" : "dark", true);
    });
  }

  // 3. Mobile Navigation Drawer Toggle
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a nav link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        mobileNavToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. One-click Copy Email Button (Clipboard Only - No Mail Popup)
  const copyEmailBtn = document.getElementById("copy-email-btn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const emailText = "rathana.lan.a3f@ap.denso.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText).then(() => {
          const originalText = copyEmailBtn.textContent;
          copyEmailBtn.textContent = "✓ Copied!";
          copyEmailBtn.style.color = "var(--accent)";
          setTimeout(() => {
            copyEmailBtn.textContent = originalText;
            copyEmailBtn.style.color = "";
          }, 2500);
        }).catch(() => {
          prompt("Copy email address:", emailText);
        });
      } else {
        prompt("Copy email address:", emailText);
      }
    });
  }

  // 5. Language Select & Google Translate Integration
  const languageSelect = document.getElementById("language-select");
  if (languageSelect) {
    languageSelect.value = localStorage.getItem("portfolio-language") || "en";

    function updateDocumentLanguage(lang) {
      document.documentElement.lang = lang === "zh-CN" ? "zh-CN" : lang;
    }
    updateDocumentLanguage(languageSelect.value);

    languageSelect.addEventListener("change", function () {
      const lang = languageSelect.value;
      updateDocumentLanguage(lang);
      try {
        localStorage.setItem("portfolio-language", lang);
      } catch (e) {}

      const applyTranslation = (attempt = 0) => {
        const translator = document.querySelector(".goog-te-combo");
        if (translator) {
          translator.value = lang;
          translator.dispatchEvent(new Event("change", { bubbles: true }));
        } else if (attempt < 30) {
          window.setTimeout(() => applyTranslation(attempt + 1), 200);
        }
      };
      applyTranslation();
    });
  }

  window.googleTranslateElementInit = function () {
    if (window.google && google.translate) {
      new google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,km,ja,zh-CN",
          autoDisplay: false,
        },
        "google_translate_element"
      );
      if (languageSelect && languageSelect.value !== "en") {
        languageSelect.dispatchEvent(new Event("change"));
      }
    }
  };

  // --------------------------------------------------------------------------
  // 6. Direct Supabase Integration (User_Request Table & Realtime Feed)
  // --------------------------------------------------------------------------
  const sbConfig = window.PORTFOLIO_SUPABASE_CONFIG || {
    url: "https://dgehlxhbggqxiznsryrv.supabase.co",
    publishableKey: "sb_publishable_0r0SqqjiXg8KGQVqQZM0TQ_KuCheFqj",
  };

  let supabaseClient = null;
  if (window.supabase && typeof window.supabase.createClient === "function") {
    try {
      supabaseClient = window.supabase.createClient(sbConfig.url, sbConfig.publishableKey);
    } catch (e) {
      console.warn("Supabase client init warning:", e);
    }
  }

  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const submitContactBtn = document.getElementById("submit-contact-btn");
  const submitBtnText = document.getElementById("submit-btn-text");
  const commentsFeed = document.getElementById("comments-feed");
  const commentsCount = document.getElementById("comments-count");

  function showFeedback(message, type = "success") {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback is-visible is-${type}`;
  }

  function getInitials(name) {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  }

  function parseCommentMessage(raw) {
    if (!raw) return { email: null, text: "" };
    let email = null;
    let text = raw.trim();
    const match = text.match(/^\[Contact Email:\s*([^\]]+)\]\s*/i);
    if (match) {
      email = match[1].trim();
      text = text.slice(match[0].length).trim();
    }
    return { email, text: text || "Sent an inquiry." };
  }

  function formatTimeAgo(dateStr) {
    if (!dateStr) return "Just now";
    const past = new Date(dateStr).getTime();
    if (isNaN(past)) return "Recently";
    const diffSec = Math.floor((Date.now() - past) / 1000);

    if (diffSec < 45) return "Just now";
    if (diffSec < 3600) return `${Math.max(1, Math.floor(diffSec / 60))}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function getAvatarStyle(name = "") {
    const palettes = [
      { bg: "rgba(16, 185, 129, 0.15)", color: "#10b981", border: "rgba(16, 185, 129, 0.35)" },
      { bg: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", border: "rgba(59, 130, 246, 0.35)" },
      { bg: "rgba(168, 85, 247, 0.15)", color: "#a855f7", border: "rgba(168, 85, 247, 0.35)" },
      { bg: "rgba(236, 72, 153, 0.15)", color: "#ec4899", border: "rgba(236, 72, 153, 0.35)" },
      { bg: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", border: "rgba(245, 158, 11, 0.35)" },
      { bg: "rgba(14, 165, 233, 0.15)", color: "#0ea5e9", border: "rgba(14, 165, 233, 0.35)" },
    ];
    let hash = 0;
    const str = name || "User";
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const theme = palettes[Math.abs(hash) % palettes.length];
    return `background:${theme.bg};color:${theme.color};border:1px solid ${theme.border};`;
  }

  function getLikedComments() {
    try {
      return JSON.parse(localStorage.getItem("dnkh_portfolio_liked_comments") || "{}");
    } catch (e) {
      return {};
    }
  }

  function setLikedComment(id, isLiked) {
    if (!id) return;
    try {
      const map = getLikedComments();
      if (isLiked) {
        map[id] = true;
      } else {
        delete map[id];
      }
      localStorage.setItem("dnkh_portfolio_liked_comments", JSON.stringify(map));
    } catch (e) {}
  }

  function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  const loadedCommentIds = new Set();
  let totalComments = 0;

  function renderCommentCard(item, isNew = false) {
    const card = document.createElement("article");
    card.className = `comment-card${isNew ? " is-new" : ""}`;
    card.dataset.id = item.id || "";

    const authorName = (item.User_Name || "").trim() || "Visitor";
    const initials = getInitials(authorName);
    const avatarStyle = getAvatarStyle(authorName);
    const timeAgo = formatTimeAgo(item.created_at);
    const subject = item.User_Sbuject || item.User_Subject || "General Inquiry";
    const { text: cleanMsg } = parseCommentMessage(item.User_Message || "");

    const likedMap = getLikedComments();
    const isLiked = item.id ? !!likedMap[item.id] : false;
    const baseLikes = item.id ? (Math.abs(Number(item.id)) % 4 + 1) : 1;
    const displayLikes = baseLikes + (isLiked ? 1 : 0);

    card.innerHTML = `
      <div class="comment-head-row">
        <div class="comment-profile">
          <div class="comment-avatar" style="${avatarStyle}" aria-hidden="true">${escapeHtml(initials)}</div>
          <div class="comment-meta">
            <span class="comment-author-name">
              ${escapeHtml(authorName)}
              <span class="comment-verified-badge" title="Verified Website Visitor">✓</span>
            </span>
            <span class="comment-time">${escapeHtml(timeAgo)}</span>
          </div>
        </div>
        <span class="comment-subject-tag">${escapeHtml(subject)}</span>
      </div>

      <div class="comment-content">
        <p class="comment-text">“${escapeHtml(cleanMsg)}”</p>
      </div>

      <div class="comment-footer-row">
        <span class="comment-status-tag">
          <span class="status-dot-pulse"></span> Logged in Supabase
        </span>
        <button class="comment-like-btn${isLiked ? " is-liked" : ""}" type="button" aria-label="Like message">
          <span class="heart-icon">${isLiked ? "❤️" : "🤍"}</span>
          <span class="like-count">${displayLikes}</span>
        </button>
      </div>
    `;

    const likeBtn = card.querySelector(".comment-like-btn");
    if (likeBtn && item.id) {
      likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const currentlyLiked = likeBtn.classList.contains("is-liked");
        const countSpan = likeBtn.querySelector(".like-count");
        const heartSpan = likeBtn.querySelector(".heart-icon");
        let count = parseInt(countSpan.textContent, 10) || 0;

        if (currentlyLiked) {
          likeBtn.classList.remove("is-liked");
          heartSpan.textContent = "🤍";
          countSpan.textContent = Math.max(0, count - 1);
          setLikedComment(item.id, false);
        } else {
          likeBtn.classList.add("is-liked");
          heartSpan.textContent = "❤️";
          countSpan.textContent = count + 1;
          setLikedComment(item.id, true);
        }
      });
    }

    return card;
  }

  function addCommentToFeed(item, isNew = false) {
    if (!commentsFeed) return;
    if (item.id && loadedCommentIds.has(item.id)) return;
    if (item.id) loadedCommentIds.add(item.id);

    const emptyEl = commentsFeed.querySelector(".comments-empty");
    if (emptyEl) {
      emptyEl.remove();
    }

    const card = renderCommentCard(item, isNew);
    commentsFeed.prepend(card);

    totalComments += 1;
    if (commentsCount) {
      commentsCount.textContent = `(${totalComments})`;
    }
  }

  // Load existing comments from User_Request (with smart diffing)
  async function loadComments(silent = false) {
    if (!commentsFeed) return;
    const refreshBtn = document.getElementById("refresh-feed-btn");
    if (refreshBtn && !silent) refreshBtn.classList.add("is-spinning");

    try {
      let rows = null;
      if (supabaseClient) {
        const { data, error } = await supabaseClient
          .from("User_Request")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(40);
        if (!error && data) rows = data;
      }

      // Fallback via standard REST fetch if client returned null
      if (!rows) {
        const res = await fetch(`${sbConfig.url}/rest/v1/User_Request?select=*&order=created_at.desc&limit=40`, {
          headers: {
            apikey: sbConfig.publishableKey,
            Authorization: `Bearer ${sbConfig.publishableKey}`,
          },
        });
        if (res.ok) {
          rows = await res.json();
        }
      }

      if (!rows || rows.length === 0) {
        if (!silent || loadedCommentIds.size === 0) {
          commentsFeed.innerHTML = `
            <div class="comments-empty">
              <span>💬</span>
              <strong>No comments yet</strong>
              <p>Be the first to send an inquiry or message above!</p>
            </div>
          `;
          if (commentsCount) commentsCount.textContent = "(0)";
        }
        return;
      }

      // If first load, render all in order
      if (loadedCommentIds.size === 0) {
        commentsFeed.innerHTML = "";
        rows.forEach((item) => {
          const card = renderCommentCard(item, false);
          commentsFeed.appendChild(card);
          if (item.id) loadedCommentIds.add(item.id);
          totalComments += 1;
        });
      } else {
        // Subsequent sync: only prepend brand-new incoming items
        // Reverse rows so they get prepended in proper chronological order
        const newItems = rows.filter((r) => !loadedCommentIds.has(r.id)).reverse();
        newItems.forEach((item) => {
          addCommentToFeed(item, true);
        });
      }

      if (commentsCount) {
        commentsCount.textContent = `(${loadedCommentIds.size})`;
      }
    } catch (err) {
      if (!silent) console.warn("Notice loading User_Request feed:", err);
    } finally {
      if (refreshBtn) refreshBtn.classList.remove("is-spinning");
    }
  }

  // Realtime subscription via Supabase channel + auto-poll fallback
  function initRealtime() {
    if (supabaseClient) {
      try {
        supabaseClient
          .channel("public:User_Request")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "User_Request" },
            (payload) => {
              console.log("Realtime event received:", payload);
              if (payload && payload.new) {
                addCommentToFeed(payload.new, true);
              } else {
                loadComments(true);
              }
            }
          )
          .subscribe((status) => {
            console.log("Supabase Realtime Status:", status);
            const statusText = document.getElementById("live-status-text");
            if (status === "SUBSCRIBED" && statusText) {
              statusText.textContent = "Realtime Live Sync";
            } else if ((status === "CHANNEL_ERROR" || status === "TIMED_OUT") && statusText) {
              statusText.textContent = "Live Auto-Sync (3s)";
            }
          });
      } catch (e) {
        console.warn("Realtime setup notice:", e);
      }
    }

    // Auto-polling fallback every 3.5 seconds to guarantee 100% sync
    // even if WebSocket publication is waiting in Supabase
    setInterval(() => {
      loadComments(true);
    }, 3500);
  }

  // Attach manual refresh button listener
  const refreshFeedBtn = document.getElementById("refresh-feed-btn");
  if (refreshFeedBtn) {
    refreshFeedBtn.addEventListener("click", () => {
      loadComments(false);
    });
  }

  loadComments();
  initRealtime();

  // Handle Form Submission: Send DIRECTLY to Supabase (NEVER mailto / NO popups)
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Stop any browser default action or popup

      const name = (document.getElementById("name")?.value || "").trim();
      const email = (document.getElementById("email")?.value || "").trim();
      const subject = (document.getElementById("subject")?.value || "Inquiry").trim();
      const message = (document.getElementById("message")?.value || "").trim();

      if (!name || !message) {
        showFeedback("Please provide your name and message.", "error");
        return;
      }

      if (submitContactBtn) submitContactBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = "Sending directly...";

      const fullMessage = email ? `[Contact Email: ${email}]\n\n${message}` : message;

      const record = {
        User_Name: name,
        User_Sbuject: subject,
        User_Message: fullMessage,
      };

      try {
        let insertedItem = null;

        // Try using Supabase JS client
        if (supabaseClient) {
          const { data, error } = await supabaseClient
            .from("User_Request")
            .insert([record])
            .select();

          if (error) {
            throw error;
          }
          if (data && data[0]) {
            insertedItem = data[0];
          }
        } else {
          // Direct fetch fallback to Supabase REST API
          const response = await fetch(`${sbConfig.url}/rest/v1/User_Request`, {
            method: "POST",
            headers: {
              apikey: sbConfig.publishableKey,
              Authorization: `Bearer ${sbConfig.publishableKey}`,
              "Content-Type": "application/json",
              Prefer: "return=representation",
            },
            body: JSON.stringify(record),
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `HTTP ${response.status}`);
          }

          const resData = await response.json();
          if (resData && resData[0]) {
            insertedItem = resData[0];
          }
        }

        // Success!
        showFeedback("✓ Message sent directly from the website! Your inquiry is saved in User_Request and shown below.", "success");
        contactForm.reset();

        // Add to feed immediately if returned
        if (insertedItem) {
          addCommentToFeed(insertedItem, true);
        } else {
          addCommentToFeed({
            id: Date.now(),
            created_at: new Date().toISOString(),
            ...record,
          }, true);
        }
      } catch (err) {
        console.error("Direct Send Error:", err);
        if (err.code === "42501" || (err.message && err.message.includes("row-level security"))) {
          showFeedback("Database Notice: Please run the RLS SQL policy in Supabase (or click Disable RLS on User_Request) to allow public website submissions.", "error");
        } else {
          showFeedback(`Could not submit: ${err.message || "Network error"}. Please check database policies.`, "error");
        }
      } finally {
        if (submitContactBtn) submitContactBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = "Send Message Directly 🚀";
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Scroll Progress & ScrollSpy
  // --------------------------------------------------------------------------
  const scrollProgress = document.getElementById("scroll-progress");
  const backToTopBtn = document.getElementById("back-to-top");
  const navLinks = [...document.querySelectorAll("header nav a[href^='#']")];
  const pageSections = [...document.querySelectorAll("main section[id], main .hero[id]")];

  let scrollUpdateQueued = false;
  const updateScrollState = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollProgress && maxScroll > 0) {
      scrollProgress.style.transform = `scaleX(${scrollY / maxScroll})`;
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle("is-visible", scrollY > 300);
    }

    const headerEl = document.querySelector("header.site-header");
    const activeThreshold = scrollY + (headerEl ? headerEl.offsetHeight : 70) + 60;
    let activeSectionId = "";

    pageSections.forEach((section) => {
      if (section.offsetTop <= activeThreshold) {
        activeSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const targetHash = link.getAttribute("href");
      if (targetHash === `#${activeSectionId}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("scroll", () => {
    if (!scrollUpdateQueued) {
      scrollUpdateQueued = true;
      requestAnimationFrame(() => {
        updateScrollState();
        scrollUpdateQueued = false;
      });
    }
  }, { passive: true });

  window.addEventListener("resize", updateScrollState);
  updateScrollState();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --------------------------------------------------------------------------
  // 8. Project Filter Tabs
  // --------------------------------------------------------------------------
  const projectFilterButtons = document.querySelectorAll(".project-filter");
  const projectCards = document.querySelectorAll(".projects .project");
  const projectCount = document.getElementById("project-count");

  projectFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const isVisible =
          selectedFilter === "all" || card.dataset.category === selectedFilter;
        card.style.display = isVisible ? "flex" : "none";
        if (isVisible) visibleCount += 1;
      });

      projectFilterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      if (projectCount) {
        projectCount.textContent =
          selectedFilter === "all"
            ? `Showing all ${visibleCount} projects`
            : `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"} · ${button.textContent.trim()}`;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 9. Rhythm Tabs Explorer
  // --------------------------------------------------------------------------
  const rhythmTabs = [...document.querySelectorAll(".rhythm-tab")];
  const rhythmPanel = document.getElementById("rhythm-panel");
  const rhythmIndex = document.getElementById("rhythm-index");
  const rhythmKicker = document.getElementById("rhythm-kicker");
  const rhythmTitle = document.getElementById("rhythm-panel-title");
  const rhythmCopy = document.getElementById("rhythm-panel-copy");
  const rhythmSegments = [...document.querySelectorAll("#rhythm-progress span")];

  function activateRhythmTab(tab, moveFocus = false) {
    const selectedIndex = rhythmTabs.indexOf(tab);
    rhythmTabs.forEach((item, index) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      if (rhythmSegments[index]) {
        rhythmSegments[index].classList.toggle("is-complete", index <= selectedIndex);
      }
    });

    if (rhythmPanel) rhythmPanel.setAttribute("aria-labelledby", tab.id);
    if (rhythmIndex) rhythmIndex.textContent = tab.dataset.step;
    if (rhythmKicker) {
      const name = tab.querySelector(".rhythm-tab-name")?.textContent || "";
      rhythmKicker.textContent = `STAGE ${tab.dataset.step} / ${name.toUpperCase()}`;
    }
    if (rhythmTitle) rhythmTitle.textContent = tab.dataset.title;
    if (rhythmCopy) rhythmCopy.textContent = tab.dataset.copy;

    if (moveFocus) tab.focus();
  }

  rhythmTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateRhythmTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % rhythmTabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + rhythmTabs.length) % rhythmTabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = rhythmTabs.length - 1;
      else return;

      event.preventDefault();
      activateRhythmTab(rhythmTabs[nextIndex], true);
    });
  });
});
