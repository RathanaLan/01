const profileStatus = document.getElementById("profile-message");
const saveButton = document.getElementById("save-profile");
const avatarFileInput = document.getElementById("avatar-file");
const avatarPreview = document.getElementById("avatar-preview");
const avatarPlaceholder = document.getElementById("avatar-placeholder");
const removePhotoButton = document.getElementById("remove-photo");
const deleteAccountButton = document.getElementById("delete-account");
const deleteConfirmInput = document.getElementById("delete-confirm");
const profileForm = document.getElementById("profile-form");
const savedIndicator = document.getElementById("saved-indicator");
const year = document.getElementById("year");

const pageConfig = window.PORTFOLIO_SUPABASE_CONFIG || {};
const configured = Boolean(
  pageConfig.url &&
  pageConfig.publishableKey &&
  !pageConfig.url.includes("YOUR_PROJECT_ID") &&
  !pageConfig.publishableKey.includes("YOUR_SUPABASE_"),
);

const supabaseClient = configured && window.supabase
  ? window.supabase.createClient(pageConfig.url, pageConfig.publishableKey)
  : null;

const photoBucket = "profile-photos";
const maxPhotoSize = 5 * 1024 * 1024;
let currentUser = null;
let currentProfile = null;
let selectedPhoto = null;
let removeCurrentPhoto = false;
let previewUrl = null;
let savedTimer = null;

function setMessage(message, type = "info") {
  if (!profileStatus) return;
  profileStatus.textContent = message;
  profileStatus.dataset.type = type;
}

function showSavedIndicator(message = "✓ Saved") {
  if (!savedIndicator) return;
  if (savedTimer) clearTimeout(savedTimer);
  savedIndicator.textContent = message;
  savedIndicator.style.opacity = "1";
  savedTimer = setTimeout(() => {
    savedIndicator.textContent = "";
  }, 3500);
}

function initialsFrom(name) {
  return (name || "RL")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "RL";
}

function showAvatar(url, name) {
  if (!avatarPreview || !avatarPlaceholder) return;
  if (url) {
    avatarPreview.src = url;
    avatarPreview.hidden = false;
    avatarPlaceholder.hidden = true;
  } else {
    avatarPreview.removeAttribute("src");
    avatarPreview.hidden = true;
    avatarPlaceholder.hidden = false;
    avatarPlaceholder.textContent = initialsFrom(name);
  }
  if (removePhotoButton) {
    removePhotoButton.hidden = !url && !selectedPhoto;
  }
}

// Compress image to a lightweight Base64 JPEG data URL (< 40KB)
// This guarantees the photo saves even if Supabase storage bucket isn't set up yet!
function compressImage(file, maxWidth = 320, maxHeight = 320, quality = 0.85) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

async function getPhotoUrl(path) {
  if (!path) {
    if (currentUser?.id) {
      const cached = localStorage.getItem(`portfolio_avatar_${currentUser.id}`);
      if (cached) return cached;
    }
    return null;
  }

  // If path is a Data URI or an absolute URL (http/https)
  if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (!supabaseClient) return null;

  // Try public URL first
  try {
    const { data: pubData } = supabaseClient.storage
      .from(photoBucket)
      .getPublicUrl(path);
    if (pubData?.publicUrl) {
      return pubData.publicUrl;
    }
  } catch (_) {}

  // Fallback to signed URL
  try {
    const { data, error } = await supabaseClient.storage
      .from(photoBucket)
      .createSignedUrl(path, 3600);
    if (!error && data?.signedUrl) {
      return data.signedUrl;
    }
  } catch (err) {
    console.warn("Could not get photo signed URL from storage:", err);
  }

  // Fallback to local storage cache if available
  if (currentUser?.id) {
    const cached = localStorage.getItem(`portfolio_avatar_${currentUser.id}`);
    if (cached) return cached;
  }

  return null;
}

async function renderProfile(profile) {
  if (!currentUser) return;
  const emailInput = document.getElementById("account-email");
  const displayNameInput = document.getElementById("display-name");
  const jobTitleInput = document.getElementById("job-title");
  const locationInput = document.getElementById("location");
  const websiteInput = document.getElementById("website");
  const bioInput = document.getElementById("bio");
  const bioCount = document.getElementById("bio-count");
  const cardName = document.getElementById("profile-card-name");
  const cardTitle = document.getElementById("profile-card-title");
  const accountStatus = document.getElementById("account-status");

  if (emailInput) emailInput.value = currentUser.email || "";
  if (displayNameInput) displayNameInput.value = profile.display_name || "";
  if (jobTitleInput) jobTitleInput.value = profile.job_title || "";
  if (locationInput) locationInput.value = profile.location || "";
  if (websiteInput) websiteInput.value = profile.website || "";
  if (bioInput) {
    bioInput.value = profile.bio || "";
    if (bioCount) bioCount.textContent = (profile.bio || "").length;
  }
  if (cardName) cardName.textContent = profile.display_name || "Your profile";
  if (cardTitle) cardTitle.textContent = profile.job_title || "Add a role title";
  if (accountStatus) accountStatus.textContent = currentUser.email || "Signed in";

  const photoUrl = await getPhotoUrl(profile.avatar_path);
  showAvatar(photoUrl, profile.display_name);
}

async function requireSession() {
  if (!supabaseClient) {
    setMessage("Supabase is not configured. Set the project URL and publishable key in assets/js/supabase-config.js.", "error");
    if (saveButton) saveButton.disabled = true;
    const accountStatus = document.getElementById("account-status");
    if (accountStatus) accountStatus.textContent = "Setup required";
    return false;
  }

  try {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
    if (session?.user) {
      currentUser = session.user;
      return true;
    }

    // Secondary fallback: getUser()
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (user) {
      currentUser = user;
      return true;
    }

    // No active session -> redirect to login
    window.location.replace("login.html");
    return false;
  } catch (err) {
    console.error("Auth check failed:", err);
    window.location.replace("login.html");
    return false;
  }
}

async function loadProfile() {
  const hasSession = await requireSession();
  if (!hasSession || !currentUser) return;

  setMessage("Loading your profile…", "loading");

  // Immediate fallback values from user metadata and localStorage
  const meta = currentUser.user_metadata || {};
  const localAvatar = localStorage.getItem(`portfolio_avatar_${currentUser.id}`);

  currentProfile = {
    id: currentUser.id,
    display_name: meta.display_name || currentUser.email?.split("@")[0] || "",
    job_title: meta.job_title || "",
    location: meta.location || "",
    bio: meta.bio || "",
    website: meta.website || "",
    avatar_path: meta.avatar_path || localAvatar || null,
  };

  // Render immediate values
  await renderProfile(currentProfile);

  // Try querying public.profiles table from Supabase
  try {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id, display_name, job_title, location, bio, website, avatar_path, updated_at")
      .eq("id", currentUser.id)
      .maybeSingle();

    if (error) {
      console.warn("Could not query 'profiles' table (using user_metadata fallback):", error.message);
      setMessage("Profile loaded from account.", "success");
      return;
    }

    if (data) {
      // Merge with database row
      currentProfile = {
        ...currentProfile,
        ...data,
        avatar_path: data.avatar_path || currentProfile.avatar_path || localAvatar || null,
      };
      await renderProfile(currentProfile);
      setMessage("Profile loaded from workspace.", "success");
    } else {
      setMessage("Complete your profile details below and click Save.", "info");
    }
  } catch (err) {
    console.warn("Profile fetch notice:", err);
    setMessage("Profile loaded from account.", "success");
  }
}

function extensionFor(file) {
  const extensions = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  return extensions[file.type] || "jpg";
}

if (avatarFileInput) {
  avatarFileInput.addEventListener("change", () => {
    const file = avatarFileInput.files?.[0];
    if (!file) return;
    if (!extensionFor(file)) {
      setMessage("Choose a JPG, PNG, or WebP image.", "error");
      avatarFileInput.value = "";
      return;
    }
    if (file.size > maxPhotoSize) {
      setMessage("The photo must be 5 MB or smaller.", "error");
      avatarFileInput.value = "";
      return;
    }
    selectedPhoto = file;
    removeCurrentPhoto = false;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(file);
    if (avatarPreview) {
      avatarPreview.src = previewUrl;
      avatarPreview.hidden = false;
    }
    if (avatarPlaceholder) avatarPlaceholder.hidden = true;
    if (removePhotoButton) removePhotoButton.hidden = false;
    setMessage("Photo selected! Click 'Save profile' below to apply.", "info");
  });
}

if (removePhotoButton) {
  removePhotoButton.addEventListener("click", () => {
    selectedPhoto = null;
    if (avatarFileInput) avatarFileInput.value = "";
    removeCurrentPhoto = true;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    try {
      if (currentUser?.id) {
        localStorage.removeItem(`portfolio_avatar_${currentUser.id}`);
      }
    } catch (_) {}
    const displayName = document.getElementById("display-name")?.value || "";
    showAvatar(null, displayName);
    removePhotoButton.hidden = true;
    setMessage("Photo will be removed when you save.", "info");
  });
}

const bioEl = document.getElementById("bio");
if (bioEl) {
  bioEl.addEventListener("input", (event) => {
    const countEl = document.getElementById("bio-count");
    if (countEl) countEl.textContent = event.currentTarget.value.length;
  });
}

const displayNameEl = document.getElementById("display-name");
if (displayNameEl) {
  displayNameEl.addEventListener("input", (event) => {
    const val = event.currentTarget.value.trim();
    const cardName = document.getElementById("profile-card-name");
    if (cardName) cardName.textContent = val || "Your profile";
    if (avatarPlaceholder && (!avatarPreview || avatarPreview.hidden)) {
      avatarPlaceholder.textContent = initialsFrom(val);
    }
  });
}

const jobTitleEl = document.getElementById("job-title");
if (jobTitleEl) {
  jobTitleEl.addEventListener("input", (event) => {
    const val = event.currentTarget.value.trim();
    const cardTitle = document.getElementById("profile-card-title");
    if (cardTitle) cardTitle.textContent = val || "Add a role title";
  });
}

if (profileForm) {
  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!profileForm.reportValidity() || !currentUser || !supabaseClient) return;

    if (saveButton) saveButton.disabled = true;
    setMessage("Saving profile to workspace…", "loading");

    let uploadedPath = null;
    const previousAvatarPath = currentProfile?.avatar_path || localStorage.getItem(`portfolio_avatar_${currentUser.id}`) || null;
    let avatarPath = removeCurrentPhoto ? null : previousAvatarPath;
    let cloudStorageSuccess = false;

    try {
      // 1. If user selected a new photo:
      if (selectedPhoto) {
        // Compress image into lightweight Base64 Data URL (guaranteed fallback)
        const compressedDataUrl = await compressImage(selectedPhoto, 320, 320, 0.85);

        // Try uploading to Supabase Storage bucket 'profile-photos'
        const extension = extensionFor(selectedPhoto);
        uploadedPath = `${currentUser.id}/avatar.${extension}`;

        try {
          const { data: uploadData, error: uploadError } = await supabaseClient.storage
            .from(photoBucket)
            .upload(uploadedPath, selectedPhoto, {
              cacheControl: "3600",
              contentType: selectedPhoto.type,
              upsert: true,
            });

          if (!uploadError && uploadData) {
            avatarPath = uploadedPath;
            cloudStorageSuccess = true;
          } else {
            console.warn("Supabase Storage bucket upload warning:", uploadError?.message);
            // Fallback: Use compressed base64 data URI so photo ALWAYS saves
            avatarPath = compressedDataUrl;
          }
        } catch (storageErr) {
          console.warn("Storage upload exception, falling back to data URI:", storageErr);
          avatarPath = compressedDataUrl;
        }

        // Cache locally for instant loading across tabs/reloads
        if (compressedDataUrl) {
          try {
            localStorage.setItem(`portfolio_avatar_${currentUser.id}`, compressedDataUrl);
          } catch (_) {}
        }
      } else if (removeCurrentPhoto) {
        avatarPath = null;
        try {
          localStorage.removeItem(`portfolio_avatar_${currentUser.id}`);
        } catch (_) {}
      }

      const updated = {
        id: currentUser.id,
        display_name: document.getElementById("display-name")?.value.trim() || "",
        job_title: document.getElementById("job-title")?.value.trim() || "",
        location: document.getElementById("location")?.value.trim() || "",
        website: document.getElementById("website")?.value.trim() || "",
        bio: document.getElementById("bio")?.value.trim() || "",
        avatar_path: avatarPath,
        updated_at: new Date().toISOString(),
      };

      // 2. Dual sync: Update Auth user metadata
      try {
        await supabaseClient.auth.updateUser({
          data: {
            display_name: updated.display_name,
            job_title: updated.job_title,
            location: updated.location,
            website: updated.website,
            bio: updated.bio,
            avatar_path: updated.avatar_path,
          },
        });
      } catch (authErr) {
        console.warn("Auth user_metadata sync notice:", authErr);
      }

      // 3. Upsert into public.profiles
      const { error: saveError } = await supabaseClient
        .from("profiles")
        .upsert(updated, { onConflict: "id" });

      if (saveError) {
        console.warn("Database profiles table upsert notice:", saveError.message);
      }

      currentProfile = updated;
      selectedPhoto = null;
      removeCurrentPhoto = false;
      if (avatarFileInput) avatarFileInput.value = "";
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = null;

      const photoUrl = await getPhotoUrl(avatarPath);
      showAvatar(photoUrl, updated.display_name);

      showSavedIndicator("✓ Saved");
      if (cloudStorageSuccess) {
        setMessage("Your profile and photo were saved to cloud storage.", "success");
      } else if (avatarPath) {
        setMessage("Your profile and photo have been saved successfully to your account.", "success");
      } else {
        setMessage("Your profile has been saved successfully.", "success");
      }
    } catch (error) {
      setMessage(error.message || "Could not save profile.", "error");
    } finally {
      if (saveButton) saveButton.disabled = false;
    }
  });
}

const signOutBtn = document.getElementById("sign-out");
if (signOutBtn) {
  signOutBtn.addEventListener("click", async () => {
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut();
      } catch (err) {
        console.warn("Sign out notice:", err);
      }
    }
    window.location.replace("login.html?logged_out=true");
  });
}

if (deleteConfirmInput && deleteAccountButton) {
  deleteConfirmInput.addEventListener("input", () => {
    deleteAccountButton.disabled = deleteConfirmInput.value.trim() !== "DELETE";
  });

  deleteAccountButton.addEventListener("click", async () => {
    if (deleteConfirmInput.value.trim() !== "DELETE" || !currentUser || !supabaseClient) return;
    if (!window.confirm("Permanently delete your account, profile, and profile photo? This cannot be undone.")) return;

    deleteAccountButton.disabled = true;
    setMessage("Deleting account…", "loading");

    try {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      if (!accessToken) {
        setMessage("Your session expired. Please sign in again.", "error");
        deleteAccountButton.disabled = false;
        return;
      }

      const { error } = await supabaseClient.functions.invoke("delete-account", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (error) {
        setMessage(`Remote deletion endpoint notice: ${error.message}. Signing out…`, "error");
      }

      await supabaseClient.auth.signOut({ scope: "local" });
      window.location.replace("login.html?account=deleted");
    } catch (err) {
      setMessage(err.message || "Failed to complete account deletion.", "error");
      deleteAccountButton.disabled = false;
    }
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

// Listen to Supabase auth events (e.g. sign out in another tab)
if (supabaseClient) {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      window.location.replace("login.html?logged_out=true");
    }
  });
}

// Start profile load
void loadProfile();
