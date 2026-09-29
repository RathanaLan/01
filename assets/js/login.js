const loginForm = document.getElementById("login-form");
const formFeedback = document.getElementById("form-feedback");
const emailInput = document.getElementById("email");
const emailField = document.getElementById("email-field");
const passwordInput = document.getElementById("password");
const passwordField = document.getElementById("password-field");
const togglePasswordBtn = document.getElementById("toggle-password");
const forgotPasswordBtn = document.getElementById("forgot-password");
const passwordConfirmInput = document.getElementById("password-confirm");
const passwordConfirmField = document.getElementById("password-confirm-field");
const togglePasswordConfirmBtn = document.getElementById("toggle-password-confirm");
const emailCodeInput = document.getElementById("email-code");
const codeField = document.getElementById("code-field");
const displayNameInput = document.getElementById("display-name");
const nameField = document.getElementById("name-field");
const submitButton = document.getElementById("submit-button");
const modeToggle = document.getElementById("mode-toggle");
const modeSwitch = document.getElementById("mode-switch");
const resendButton = document.getElementById("resend-code");
const authNavTabs = document.getElementById("auth-nav-tabs");
const tabPassword = document.getElementById("tab-password");
const tabOtp = document.getElementById("tab-otp");
const editEmailBtn = document.getElementById("edit-email");
const emailStepOptions = document.getElementById("email-step-options");
const codeStepOptions = document.getElementById("code-step-options");
const switchToPasswordBtn = document.getElementById("switch-to-password-btn");
const codeTip = document.getElementById("code-tip");
const rememberOption = document.getElementById("remember-option");
const year = document.getElementById("year");
const accountExistsModal = document.getElementById("account-exists-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalSigninBtn = document.getElementById("modal-signin-btn");
const modalResetBtn = document.getElementById("modal-reset-btn");
const modalEmailDisplay = document.getElementById("modal-email-display");
let activeModalEmail = "";

const pageConfig = window.PORTFOLIO_SUPABASE_CONFIG || {};
const hasSupabaseConfig = Boolean(
  pageConfig.url &&
  pageConfig.publishableKey &&
  !pageConfig.url.includes("YOUR_PROJECT_ID") &&
  !pageConfig.publishableKey.includes("YOUR_SUPABASE_"),
);

let supabaseClient = null;
let mode = "signin"; // 'signin' | 'signup'
let signinMethod = "password"; // 'password' | 'otp'
let otpStep = "email"; // 'email' | 'code'
let pendingEmail = "";
let resendTimer = null;

function getSupabaseClient() {
  if (!hasSupabaseConfig || !window.supabase) return null;
  if (!supabaseClient) {
    const rememberCheckbox = document.querySelector('[name="remember"]');
    const storage = rememberCheckbox && !rememberCheckbox.checked
      ? window.sessionStorage
      : window.localStorage;

    supabaseClient = window.supabase.createClient(
      pageConfig.url,
      pageConfig.publishableKey,
      {
        auth: {
          storage,
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      },
    );
  }
  return supabaseClient;
}

function showFeedback(message, type = "error") {
  if (!formFeedback) return;
  formFeedback.textContent = message;
  formFeedback.dataset.type = type;
}

function setBusy(isBusy, label) {
  submitButton.disabled = isBusy;
  submitButton.setAttribute("aria-busy", String(isBusy));
  const arrow = submitButton.querySelector("span");
  if (arrow) {
    submitButton.innerHTML = `${label} <span aria-hidden="true">→</span>`;
  } else {
    submitButton.textContent = label;
  }
}

function getProfileUrl() {
  const path = window.location.pathname.replace(
    /login\.html$/i,
    "profile.html",
  );
  return new URL(path, window.location.origin).href;
}

function updateUI() {
  const isSignup = mode === "signup";
  const eyebrowEl = document.getElementById("form-eyebrow");
  const titleEl = document.getElementById("signin-title");
  const descEl = document.getElementById("form-description");
  const accessNoteEl = document.getElementById("access-note-text");

  if (isSignup) {
    if (authNavTabs) authNavTabs.hidden = true;
    if (eyebrowEl) eyebrowEl.textContent = "Join the workspace";
    if (titleEl) titleEl.textContent = "Create your account.";
    if (descEl) descEl.textContent = "Register with your name, work email, and a secure password.";
    if (accessNoteEl) {
      accessNoteEl.textContent = "Workspace accounts are authorized for DNKH Digital Transformation portal activities.";
    }

    nameField.hidden = false;
    displayNameInput.required = true;

    emailField.hidden = false;
    emailInput.required = true;

    passwordField.hidden = false;
    passwordInput.required = true;
    if (forgotPasswordBtn) forgotPasswordBtn.hidden = true;

    passwordConfirmField.hidden = false;
    passwordConfirmInput.required = true;

    codeField.hidden = true;
    emailCodeInput.required = false;

    emailStepOptions.hidden = false;
    codeStepOptions.hidden = true;

    modeSwitch.firstChild.textContent = "Already registered? ";
    modeToggle.textContent = "Sign in";

    submitButton.innerHTML = 'Create account <span aria-hidden="true">→</span>';
  } else {
    // Sign In Mode
    if (authNavTabs) authNavTabs.hidden = false;
    if (eyebrowEl) eyebrowEl.textContent = "Welcome back";
    if (titleEl) titleEl.textContent = "Sign in to continue.";
    if (accessNoteEl) {
      accessNoteEl.textContent = "Access is intended for authorized team members. Contact the portfolio owner if you need an account.";
    }

    nameField.hidden = true;
    displayNameInput.required = false;

    passwordConfirmField.hidden = true;
    passwordConfirmInput.required = false;

    modeSwitch.firstChild.textContent = "New to the workspace? ";
    modeToggle.textContent = "Create an account";

    if (codeTip) codeTip.hidden = true;

    if (signinMethod === "password") {
      tabPassword.classList.add("is-active");
      tabPassword.setAttribute("aria-selected", "true");
      tabOtp.classList.remove("is-active");
      tabOtp.setAttribute("aria-selected", "false");

      if (descEl) descEl.textContent = "Use your authorized work email and password to continue.";

      emailField.hidden = false;
      emailInput.required = true;

      passwordField.hidden = false;
      passwordInput.required = true;
      if (forgotPasswordBtn) forgotPasswordBtn.hidden = false;

      codeField.hidden = true;
      emailCodeInput.required = false;

      emailStepOptions.hidden = false;
      codeStepOptions.hidden = true;

      submitButton.innerHTML = 'Sign in <span aria-hidden="true">→</span>';
    } else {
      // OTP Method
      tabOtp.classList.add("is-active");
      tabOtp.setAttribute("aria-selected", "true");
      tabPassword.classList.remove("is-active");
      tabPassword.setAttribute("aria-selected", "false");

      passwordField.hidden = true;
      passwordInput.required = false;

      if (otpStep === "email") {
        if (codeTip) codeTip.hidden = true;
        if (descEl) descEl.textContent = "We’ll email you a secure, one-time verification code.";
        emailField.hidden = false;
        emailInput.required = true;

        codeField.hidden = true;
        emailCodeInput.required = false;

        emailStepOptions.hidden = false;
        codeStepOptions.hidden = true;

        submitButton.innerHTML = 'Email me a code <span aria-hidden="true">→</span>';
      } else {
        if (codeTip) codeTip.hidden = false;
        if (descEl) descEl.textContent = `Enter the 6-digit code sent to ${pendingEmail}.`;
        emailField.hidden = true;
        emailInput.required = false;

        codeField.hidden = false;
        emailCodeInput.required = true;

        emailStepOptions.hidden = true;
        codeStepOptions.hidden = false;

        submitButton.innerHTML = 'Verify and continue <span aria-hidden="true">→</span>';
      }
    }
  }
}

function setMode(nextMode) {
  mode = nextMode;
  showFeedback("");
  updateUI();
}

function setSigninMethod(method) {
  signinMethod = method;
  otpStep = "email";
  showFeedback("");
  updateUI();
}

function clearResendTimer() {
  if (resendTimer) window.clearInterval(resendTimer);
  resendTimer = null;
  if (resendButton) resendButton.disabled = false;
  const countdown = document.getElementById("resend-countdown");
  if (countdown) countdown.textContent = "";
}

function startResendCooldown(seconds = 30) {
  clearResendTimer();
  let remaining = seconds;
  const countdown = document.getElementById("resend-countdown");
  if (resendButton) resendButton.disabled = true;
  if (countdown) countdown.textContent = `Available in ${remaining}s`;
  resendTimer = window.setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearResendTimer();
      return;
    }
    if (countdown) countdown.textContent = `Available in ${remaining}s`;
  }, 1000);
}

// Password Sign In
async function handlePasswordSignIn() {
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  if (!email || !password) {
    showFeedback("Please enter your work email and password.", "error");
    return;
  }

  const client = getSupabaseClient();
  if (!client) {
    showFeedback("Supabase is not configured yet. Check assets/js/supabase-config.js.", "setup");
    return;
  }

  setBusy(true, "Signing in…");
  showFeedback("Verifying your credentials…", "loading");

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    showFeedback("Signed in successfully! Opening your profile…", "success");
    setTimeout(() => {
      window.location.assign(getProfileUrl());
    }, 600);
  } catch (error) {
    const msg = error.message || "Failed to sign in.";
    if (msg.toLowerCase().includes("invalid login credentials")) {
      showFeedback("Invalid email or password. Please check your credentials and try again.", "error");
    } else if (msg.toLowerCase().includes("email not confirmed")) {
      showFeedback("Email not confirmed. Please click the confirmation link sent to your email.", "error");
    } else {
      showFeedback(msg, "error");
    }
  } finally {
    setBusy(false, "Sign in");
  }
}

// Show eye-catching duplicate account modal popup
function showAccountExistsModal(email) {
  activeModalEmail = (email || emailInput.value || "").trim().toLowerCase();
  if (modalEmailDisplay) {
    modalEmailDisplay.textContent = activeModalEmail;
  }
  if (accountExistsModal) {
    accountExistsModal.hidden = false;
    requestAnimationFrame(() => {
      accountExistsModal.classList.add("is-open");
      if (modalSigninBtn) modalSigninBtn.focus();
    });
  }
}

function hideAccountExistsModal() {
  if (!accountExistsModal) return;
  accountExistsModal.classList.remove("is-open");
  setTimeout(() => {
    accountExistsModal.hidden = true;
  }, 270);
}

// Alert and prevent duplicate account creation
function handleExistingAccountAlert(email) {
  // Highlight email input with shake animation
  emailInput.classList.add("input-error");
  setTimeout(() => emailInput.classList.remove("input-error"), 4000);

  // Switch form to Sign In mode immediately
  setMode("signin");
  setSigninMethod("password");
  emailInput.value = email;

  // Prominently display error feedback
  showFeedback(
    `⚠️ Account already exists! "${email}" is already registered. Please sign in with your password.`,
    "error",
  );

  // Focus password input for instant sign in
  passwordInput.value = "";
  passwordInput.focus();

  // Open the custom eye-catching popup dialog
  showAccountExistsModal(email);
}

// Password Sign Up
async function handlePasswordSignUp() {
  const name = displayNameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const confirmPassword = passwordConfirmInput.value;

  if (!name) {
    showFeedback("Please enter your full name.", "error");
    displayNameInput.focus();
    return;
  }
  if (!email) {
    showFeedback("Please enter your work email.", "error");
    emailInput.focus();
    return;
  }
  if (!password || password.length < 6) {
    showFeedback("Password must be at least 6 characters long.", "error");
    passwordInput.focus();
    return;
  }
  if (password !== confirmPassword) {
    showFeedback("Passwords do not match. Please verify both password fields.", "error");
    passwordConfirmInput.focus();
    return;
  }

  const client = getSupabaseClient();
  if (!client) {
    showFeedback("Supabase is not configured yet. Check assets/js/supabase-config.js.", "setup");
    return;
  }

  setBusy(true, "Checking account…");
  showFeedback("Verifying account availability…", "loading");

  try {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    // Check Case 1: Supabase enumeration protection returns data.user with empty identities array if user exists
    const userAlreadyExists = Boolean(
      data?.user &&
      Array.isArray(data.user.identities) &&
      data.user.identities.length === 0,
    );

    if (userAlreadyExists) {
      handleExistingAccountAlert(email);
      return;
    }

    // Check Case 2: Direct Supabase duplicate error
    if (error) {
      const errMsg = (error.message || "").toLowerCase();
      if (
        errMsg.includes("already registered") ||
        errMsg.includes("already exists") ||
        errMsg.includes("user_already_exists") ||
        error.status === 422
      ) {
        handleExistingAccountAlert(email);
        return;
      }
      throw error;
    }

    // Case 3: Fresh account created successfully!
    if (data?.session) {
      // User is immediately logged in
      try {
        await client.from("profiles").upsert({
          id: data.user.id,
          display_name: name,
          updated_at: new Date().toISOString(),
        });
      } catch (profileErr) {
        console.warn("Initial profile upsert notice:", profileErr);
      }

      showFeedback("Account created! Opening your profile…", "success");
      setTimeout(() => {
        window.location.assign(getProfileUrl());
      }, 700);
    } else if (data?.user) {
      // Confirmation email required
      showFeedback(
        `Account created! A confirmation email was sent to ${email}. Please confirm your email, then return here to sign in.`,
        "success",
      );
      setMode("signin");
      emailInput.value = email;
    }
  } catch (error) {
    const msg = (error.message || "").toLowerCase();
    if (
      msg.includes("already registered") ||
      msg.includes("already exists") ||
      msg.includes("user_already_exists") ||
      error.status === 422
    ) {
      handleExistingAccountAlert(email);
    } else {
      showFeedback(error.message || "Could not create account.", "error");
    }
  } finally {
    setBusy(false, mode === "signup" ? "Create account" : "Sign in");
  }
}

// Forgot Password
async function handleForgotPassword() {
  const email = emailInput.value.trim().toLowerCase();
  if (!email) {
    showFeedback("Enter your work email in the email field above to request a reset link.", "error");
    emailInput.focus();
    return;
  }
  const client = getSupabaseClient();
  if (!client) return;

  showFeedback("Sending password reset instructions…", "loading");
  try {
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: getProfileUrl(),
    });
    if (error) throw error;
    showFeedback(`Password reset instructions sent to ${email}. Check your inbox.`, "success");
  } catch (error) {
    showFeedback(error.message || "Could not send password reset email.", "error");
  }
}

// Send OTP Code
async function sendCode() {
  const client = getSupabaseClient();
  if (!client) {
    showFeedback(
      "Connect Supabase first: add your project URL and publishable key in assets/js/supabase-config.js.",
      "setup",
    );
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  if (!email) {
    showFeedback("Please enter your work email.", "error");
    emailInput.focus();
    return;
  }

  setBusy(true, "Sending code…");
  showFeedback("Sending your 6-digit code…", "loading");

  try {
    let emailRedirectTo = undefined;
    if (window.location.protocol.startsWith("http")) {
      emailRedirectTo = new URL("profile.html", window.location.href).href;
    }

    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo,
      },
    });
    if (error) throw error;

    pendingEmail = email;
    otpStep = "code";
    updateUI();
    const destination = document.getElementById("code-destination");
    if (destination) destination.textContent = `We sent a 6-digit code to ${email}.`;
    showFeedback("Check your inbox and enter the 6-digit code to continue.", "success");
    startResendCooldown();
    emailCodeInput.focus();
  } catch (error) {
    showFeedback(
      error.message || "Could not send code. Check your email or use password sign in.",
      "error",
    );
  } finally {
    setBusy(false, otpStep === "code" ? "Verify and continue" : "Email me a code");
  }
}

// Verify OTP Code
async function verifyCode() {
  const code = emailCodeInput.value.trim();
  if (!code || code.length !== 6) {
    showFeedback("Please enter the 6-digit verification code.", "error");
    emailCodeInput.focus();
    return;
  }

  const client = getSupabaseClient();
  if (!client) return;

  setBusy(true, "Verifying…");
  showFeedback("Verifying your email code…", "loading");

  try {
    const { error } = await client.auth.verifyOtp({
      email: pendingEmail,
      token: code,
      type: "email",
    });
    if (error) throw error;

    clearResendTimer();
    showFeedback("Verified successfully! Opening your profile…", "success");
    setTimeout(() => {
      window.location.assign(getProfileUrl());
    }, 600);
  } catch (error) {
    showFeedback(
      error.message || "That code is invalid or expired. Request a new one and try again.",
      "error",
    );
  } finally {
    setBusy(false, "Verify and continue");
  }
}

// Resend OTP Code
async function resendCode() {
  const client = getSupabaseClient();
  if (!client || resendButton.disabled || !pendingEmail) return;

  resendButton.disabled = true;
  showFeedback("Sending a fresh code…", "loading");

  try {
    let emailRedirectTo = undefined;
    if (window.location.protocol.startsWith("http")) {
      emailRedirectTo = new URL("profile.html", window.location.href).href;
    }

    const { error } = await client.auth.signInWithOtp({
      email: pendingEmail,
      options: {
        shouldCreateUser: false,
        emailRedirectTo,
      },
    });
    if (error) throw error;
    showFeedback(`A fresh code was sent to ${pendingEmail}.`, "success");
    startResendCooldown();
  } catch (error) {
    resendButton.disabled = false;
    showFeedback(error.message || "Could not resend the code. Try again shortly.", "error");
  }
}

// Check session on initial load
async function checkCurrentSession() {
  const client = getSupabaseClient();
  if (!client) return;

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("logged_out") === "true") {
    showFeedback("You have been signed out.", "info");
    return;
  }
  if (urlParams.get("account") === "deleted") {
    showFeedback("Your account has been deleted.", "info");
    return;
  }

  // Detect email link callback (#access_token=... or ?code=...)
  if (window.location.hash.includes("access_token=") || window.location.search.includes("code=")) {
    showFeedback("Authenticating from email link…", "loading");
    try {
      const { data: { session } } = await client.auth.getSession();
      if (session?.user) {
        showFeedback("Verified from email link! Opening your profile…", "success");
        setTimeout(() => {
          window.location.assign(getProfileUrl());
        }, 500);
        return;
      }
    } catch (_) {}
  }

  try {
    const { data: { session } } = await client.auth.getSession();
    if (session?.user) {
      showFeedback("You are already signed in. Opening your profile…", "success");
      setTimeout(() => {
        window.location.assign(getProfileUrl());
      }, 700);
    }
  } catch (err) {
    console.warn("Session check warning:", err);
  }
}

// Event Listeners
if (tabPassword) {
  tabPassword.addEventListener("click", () => setSigninMethod("password"));
}
if (tabOtp) {
  tabOtp.addEventListener("click", () => setSigninMethod("otp"));
}

if (switchToPasswordBtn) {
  switchToPasswordBtn.addEventListener("click", () => {
    setSigninMethod("password");
    passwordInput.focus();
  });
}

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    setMode(mode === "signin" ? "signup" : "signin");
  });
}

if (togglePasswordBtn) {
  togglePasswordBtn.addEventListener("click", () => {
    const isPw = passwordInput.type === "password";
    passwordInput.type = isPw ? "text" : "password";
    togglePasswordBtn.textContent = isPw ? "Hide" : "Show";
  });
}

if (togglePasswordConfirmBtn) {
  togglePasswordConfirmBtn.addEventListener("click", () => {
    const isPw = passwordConfirmInput.type === "password";
    passwordConfirmInput.type = isPw ? "text" : "password";
    togglePasswordConfirmBtn.textContent = isPw ? "Hide" : "Show";
  });
}

if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener("click", handleForgotPassword);
}

if (editEmailBtn) {
  editEmailBtn.addEventListener("click", () => {
    otpStep = "email";
    clearResendTimer();
    updateUI();
    emailInput.focus();
  });
}

if (resendButton) {
  resendButton.addEventListener("click", resendCode);
}

// Account Exists Modal Events
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", hideAccountExistsModal);
}

if (accountExistsModal) {
  accountExistsModal.addEventListener("click", (event) => {
    if (event.target === accountExistsModal) {
      hideAccountExistsModal();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    accountExistsModal &&
    !accountExistsModal.hidden
  ) {
    hideAccountExistsModal();
  }
});

if (modalSigninBtn) {
  modalSigninBtn.addEventListener("click", () => {
    hideAccountExistsModal();
    setMode("signin");
    setSigninMethod("password");
    if (activeModalEmail) {
      emailInput.value = activeModalEmail;
    }
    passwordInput.value = "";
    passwordInput.focus();
    showFeedback("Please enter your password to sign in.", "info");
  });
}

if (modalResetBtn) {
  modalResetBtn.addEventListener("click", () => {
    hideAccountExistsModal();
    if (activeModalEmail) {
      emailInput.value = activeModalEmail;
    }
    handleForgotPassword();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!loginForm.reportValidity()) return;

    if (mode === "signup") {
      void handlePasswordSignUp();
    } else if (signinMethod === "password") {
      void handlePasswordSignIn();
    } else if (otpStep === "email") {
      void sendCode();
    } else {
      void verifyCode();
    }
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

// Check for mode in URL (e.g. login.html?mode=signup)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("mode") === "signup") {
  setMode("signup");
} else {
  updateUI();
}

// If Supabase is not configured, inform user
if (!hasSupabaseConfig || !window.supabase) {
  showFeedback(
    "Online sign-in needs Supabase project settings. Add project URL and public key in assets/js/supabase-config.js.",
    "setup",
  );
} else {
  void checkCurrentSession();
}
