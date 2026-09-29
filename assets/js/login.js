const loginForm = document.getElementById("login-form");
const formFeedback = document.getElementById("form-feedback");
const emailInput = document.getElementById("email");
const emailCodeInput = document.getElementById("email-code");
const displayNameInput = document.getElementById("display-name");
const submitButton = document.getElementById("submit-button");
const modeToggle = document.getElementById("mode-toggle");
const resendButton = document.getElementById("resend-code");
const year = document.getElementById("year");
const pageConfig = window.PORTFOLIO_SUPABASE_CONFIG || {};
const hasSupabaseConfig = Boolean(
  pageConfig.url &&
  pageConfig.publishableKey &&
  !pageConfig.url.includes("YOUR_PROJECT_ID") &&
  !pageConfig.publishableKey.includes("YOUR_SUPABASE_"),
);
let supabaseClient = null;
let mode = "signin";
let step = "email";
let pendingEmail = "";
let resendTimer = null;

function getSupabaseClient() {
  if (!hasSupabaseConfig || !window.supabase) return null;
  if (!supabaseClient) {
    supabaseClient = window.supabase.createClient(
      pageConfig.url,
      pageConfig.publishableKey,
      {
        auth: {
          storage: document.querySelector('[name="remember"]').checked
            ? window.localStorage
            : window.sessionStorage,
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
  formFeedback.textContent = message;
  formFeedback.dataset.type = type;
}

function setMode(nextMode) {
  mode = nextMode;
  const isSignup = mode === "signup";
  document.getElementById("form-eyebrow").textContent = isSignup
    ? "Join the workspace"
    : "Welcome back";
  document.getElementById("signin-title").textContent = isSignup
    ? "Create your account."
    : "Sign in to continue.";
  document.getElementById("form-description").textContent = isSignup
    ? "We’ll verify your email and create your workspace account."
    : "We’ll email you a secure, one-time sign-in code.";
  nameField.hidden = !isSignup;
  displayNameInput.required = isSignup;
  document.getElementById("mode-switch").firstChild.textContent = isSignup
    ? "Already registered? "
    : "New to the workspace? ";
  modeToggle.textContent = isSignup ? "Sign in" : "Create an account";
  document.getElementById("access-note-text").textContent = isSignup
    ? "Each email belongs to one account. Existing accounts can request a sign-in code instead of registering again."
    : "Access is intended for authorized team members. Contact the portfolio owner if you need an account.";
  showFeedback("");
}

function setBusy(isBusy, label) {
  submitButton.disabled = isBusy;
  submitButton.setAttribute("aria-busy", String(isBusy));
  submitButton.firstChild.textContent = `${label} `;
}

function setMode(nextMode) {
  mode = nextMode;
  const isSignup = mode === "signup";
  document.getElementById("form-eyebrow").textContent = isSignup
    ? "Join the workspace"
    : "Welcome back";
  document.getElementById("signin-title").textContent = isSignup
    ? "Create your account."
    : "Sign in to continue.";
  document.getElementById("form-description").textContent = isSignup
    ? "We’ll verify your email and create your workspace account."
    : "We’ll email you a secure, one-time sign-in code.";
  document.getElementById("name-field").hidden = !isSignup;
  displayNameInput.required = isSignup;
  document.getElementById("access-note-text").textContent = isSignup
    ? "Each email belongs to one account. Existing accounts can request a sign-in code instead of registering again."
    : "Access is intended for authorized team members. Contact the portfolio owner if you need an account.";
  modeToggle.textContent = isSignup ? "Sign in" : "Create an account";
  document.getElementById("mode-switch").firstChild.textContent = isSignup
    ? "Already registered? "
    : "New to the workspace? ";
  showFeedback("");
}

function clearResendTimer() {
  if (resendTimer) window.clearInterval(resendTimer);
  resendTimer = null;
  resendButton.disabled = false;
  document.getElementById("resend-countdown").textContent = "";
}

function startResendCooldown(seconds = 30) {
  clearResendTimer();
  let remaining = seconds;
  const countdown = document.getElementById("resend-countdown");
  resendButton.disabled = true;
  countdown.textContent = `Available in ${remaining}s`;
  resendTimer = window.setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearResendTimer();
      return;
    }
    countdown.textContent = `Available in ${remaining}s`;
  }, 1000);
}

function showCodeStep(email) {
  step = "code";
  pendingEmail = email;
  document.getElementById("email-field").hidden = true;
  document.getElementById("name-field").hidden = true;
  document.getElementById("code-field").hidden = false;
  document.getElementById("email-step-options").hidden = true;
  document.getElementById("code-step-options").hidden = false;
  document.getElementById("mode-switch").hidden = true;
  document.getElementById("code-destination").textContent =
    `We sent a 6-digit code to ${email}.`;
  emailCodeInput.required = true;
  submitButton.firstChild.textContent = "Verify and continue ";
  showFeedback("Check your inbox and enter the code to continue.", "success");
  startResendCooldown();
  emailCodeInput.focus();
}

function getProfileUrl() {
  const path = window.location.pathname.replace(
    /login\.html$/i,
    "profile.html",
  );
  return new URL(path, window.location.origin).href;
}

function showEmailStep() {
  step = "email";
  clearResendTimer();
  document.getElementById("email-field").hidden = false;
  document.getElementById("name-field").hidden = mode !== "signup";
  document.getElementById("code-field").hidden = true;
  document.getElementById("email-step-options").hidden = false;
  document.getElementById("code-step-options").hidden = true;
  document.getElementById("mode-switch").hidden = false;
  emailCodeInput.required = false;
  emailCodeInput.value = "";
  submitButton.firstChild.textContent = "Email me a code ";
  showFeedback("");
  emailInput.focus();
}

async function sendCode() {
  if (!loginForm.reportValidity()) return;
  const client = getSupabaseClient();
  if (!client) {
    showFeedback(
      "Connect Supabase first: add your project URL and publishable/anon key in assets/js/supabase-config.js.",
      "setup",
    );
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  setBusy(true, "Sending code…");
  showFeedback(
    mode === "signup" ? "Creating your account…" : "Sending your code…",
    "loading",
  );

  try {
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: mode === "signup",
        ...(mode === "signup"
          ? { data: { display_name: displayNameInput.value.trim() } }
          : {}),
      },
    });
    if (error) throw error;
    showCodeStep(email);
  } catch (error) {
    showFeedback(
      error.message || "Could not send a code. Check the email and try again.",
    );
  } finally {
    setBusy(false, step === "code" ? "Verify and continue" : "Email me a code");
  }
}

async function verifyCode() {
  if (!emailCodeInput.reportValidity()) return;
  const client = getSupabaseClient();
  if (!client) {
    showFeedback("Supabase is not configured yet.", "setup");
    return;
  }

  setBusy(true, "Verifying…");
  showFeedback("Verifying your email code…", "loading");
  try {
    const { error } = await client.auth.verifyOtp({
      email: pendingEmail,
      token: emailCodeInput.value.trim(),
      type: "email",
    });
    if (error) throw error;
    clearResendTimer();
    showFeedback("Verified. Opening the portfolio…", "success");
    window.location.assign(getProfileUrl());
  } catch (error) {
    showFeedback(
      error.message ||
        "That code is invalid or expired. Request a new one and try again.",
    );
  } finally {
    setBusy(false, "Verify and continue");
  }
}

async function resendCode() {
  const client = getSupabaseClient();
  if (!client || resendButton.disabled) return;
  resendButton.disabled = true;
  showFeedback("Sending another code…", "loading");
  try {
    const { error } = await client.auth.signInWithOtp({
      email: pendingEmail,
      options: {
        shouldCreateUser: mode === "signup",
        ...(mode === "signup"
          ? { data: { display_name: displayNameInput.value.trim() } }
          : {}),
      },
    });
    if (error) throw error;
    showFeedback(`A new code was sent to ${pendingEmail}.`, "success");
    startResendCooldown();
  } catch (error) {
    resendButton.disabled = false;
    showFeedback(
      error.message || "Could not resend the code. Try again shortly.",
    );
  }
}

year.textContent = new Date().getFullYear();
modeToggle.addEventListener("click", () => {
  if (step === "code") return;
  setMode(mode === "signin" ? "signup" : "signin");
});
document.getElementById("edit-email").addEventListener("click", showEmailStep);
resendButton.addEventListener("click", resendCode);
setMode("signin");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (step === "email") void sendCode();
  else void verifyCode();
});

if (!hasSupabaseConfig || !window.supabase) {
  showFeedback(
    "Online sign-in needs Supabase project settings. Add the project URL and public key to assets/js/supabase-config.js.",
    "setup",
  );
}
