const profileStatus = document.getElementById("profile-message");
const saveButton = document.getElementById("save-profile");
const avatarFileInput = document.getElementById("avatar-file");
const avatarPreview = document.getElementById("avatar-preview");
const avatarPlaceholder = document.getElementById("avatar-placeholder");
const removePhotoButton = document.getElementById("remove-photo");
const deleteAccountButton = document.getElementById("delete-account");
const deleteConfirmInput = document.getElementById("delete-confirm");
const profileForm = document.getElementById("profile-form");
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

function setMessage(message, type = "info") {
  profileStatus.textContent = message;
  profileStatus.dataset.type = type;
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
  removePhotoButton.hidden = !url && !selectedPhoto;
}

async function getPhotoUrl(path) {
  if (!path) return null;
  const { data, error } = await supabaseClient.storage
    .from(photoBucket)
    .createSignedUrl(path, 3600);
  if (error) {
    console.warn("Could not create profile-photo URL.", error.message);
    return null;
  }
  return data.signedUrl;
}

async function renderProfile(profile) {
  document.getElementById("account-email").value = currentUser.email || "";
  document.getElementById("display-name").value = profile.display_name || "";
  document.getElementById("job-title").value = profile.job_title || "";
  document.getElementById("location").value = profile.location || "";
  document.getElementById("website").value = profile.website || "";
  document.getElementById("bio").value = profile.bio || "";
  document.getElementById("bio-count").textContent = (profile.bio || "").length;
  document.getElementById("profile-card-name").textContent = profile.display_name || "Your profile";
  document.getElementById("profile-card-title").textContent = profile.job_title || "Add a role title";
  document.getElementById("account-status").textContent = currentUser.email || "Signed in";
  const photoUrl = await getPhotoUrl(profile.avatar_path);
  showAvatar(photoUrl, profile.display_name);
}

async function requireSession() {
  if (!supabaseClient) {
    setMessage("Supabase is not configured. Set the project URL and publishable key before using profiles.", "error");
    saveButton.disabled = true;
    document.getElementById("account-status").textContent = "Setup required";
    return false;
  }
  const { data, error } = await supabaseClient.auth.getSession();
  if (error || !data.session) {
    window.location.replace("login.html");
    return false;
  }
  currentUser = data.session.user;
  return true;
}

async function loadProfile() {
  if (!(await requireSession())) return;
  setMessage("Loading your profile…", "loading");
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id, display_name, job_title, location, bio, website, avatar_path")
    .eq("id", currentUser.id)
    .maybeSingle();
  if (error) {
    setMessage(`Could not load profile: ${error.message}`, "error");
    return;
  }
  currentProfile = data || {
    id: currentUser.id,
    display_name: currentUser.user_metadata?.display_name || "",
    job_title: "",
    location: "",
    bio: "",
    website: "",
    avatar_path: null,
  };
  await renderProfile(currentProfile);
  setMessage(data ? "Profile loaded." : "Add your details, then save your profile.", "success");
}

function extensionFor(file) {
  const extensions = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
  return extensions[file.type] || null;
}

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
  avatarPreview.src = previewUrl;
  avatarPreview.hidden = false;
  avatarPlaceholder.hidden = true;
  removePhotoButton.hidden = false;
  setMessage("Photo selected. Save the profile to upload it.", "success");
});

removePhotoButton.addEventListener("click", () => {
  selectedPhoto = null;
  avatarFileInput.value = "";
  removeCurrentPhoto = true;
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = null;
  showAvatar(null, document.getElementById("display-name").value);
  removePhotoButton.hidden = false;
  setMessage("Photo will be removed when you save.", "info");
});

document.getElementById("bio").addEventListener("input", (event) => {
  document.getElementById("bio-count").textContent = event.currentTarget.value.length;
});
document.getElementById("display-name").addEventListener("input", (event) => {
  document.getElementById("profile-card-name").textContent = event.currentTarget.value || "Your profile";
  if (!avatarPreview.src || avatarPreview.hidden) avatarPlaceholder.textContent = initialsFrom(event.currentTarget.value);
});
document.getElementById("job-title").addEventListener("input", (event) => {
  document.getElementById("profile-card-title").textContent = event.currentTarget.value || "Add a role title";
});

profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!profileForm.reportValidity() || !currentUser || !supabaseClient) return;
  saveButton.disabled = true;
  setMessage("Saving profile…", "loading");
  let uploadedPath = null;
  const previousAvatarPath = currentProfile?.avatar_path || null;
  let avatarPath = removeCurrentPhoto ? null : previousAvatarPath;

  try {
    if (selectedPhoto) {
      const extension = extensionFor(selectedPhoto);
      uploadedPath = `${currentUser.id}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabaseClient.storage
        .from(photoBucket)
        .upload(uploadedPath, selectedPhoto, {
          cacheControl: "3600",
          contentType: selectedPhoto.type,
          upsert: false,
        });
      if (uploadError) throw uploadError;
      avatarPath = uploadedPath;
    }

    const updated = {
      id: currentUser.id,
      display_name: document.getElementById("display-name").value.trim(),
      job_title: document.getElementById("job-title").value.trim(),
      location: document.getElementById("location").value.trim(),
      website: document.getElementById("website").value.trim(),
      bio: document.getElementById("bio").value.trim(),
      avatar_path: avatarPath,
      updated_at: new Date().toISOString(),
    };
    const { error: saveError } = await supabaseClient
      .from("profiles")
      .upsert(updated, { onConflict: "id" });
    if (saveError) throw saveError;

    if (previousAvatarPath && previousAvatarPath !== avatarPath) {
      const { error: removeError } = await supabaseClient.storage
        .from(photoBucket)
        .remove([previousAvatarPath]);
      if (removeError) console.warn("Old profile photo cleanup failed.", removeError.message);
    }

    currentProfile = updated;
    selectedPhoto = null;
    removeCurrentPhoto = false;
    avatarFileInput.value = "";
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    const photoUrl = await getPhotoUrl(avatarPath);
    showAvatar(photoUrl, updated.display_name);
    setMessage("Your profile is saved.", "success");
  } catch (error) {
    if (uploadedPath) {
      await supabaseClient.storage.from(photoBucket).remove([uploadedPath]);
    }
    setMessage(error.message || "Could not save your profile.", "error");
  } finally {
    saveButton.disabled = false;
  }
});

document.getElementById("sign-out").addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    setMessage(`Could not sign out: ${error.message}`, "error");
    return;
  }
  window.location.replace("login.html");
});

deleteConfirmInput.addEventListener("input", () => {
  deleteAccountButton.disabled = deleteConfirmInput.value.trim() !== "DELETE";
});

deleteAccountButton.addEventListener("click", async () => {
  if (deleteConfirmInput.value.trim() !== "DELETE" || !currentUser || !supabaseClient) return;
  if (!window.confirm("Permanently delete your account, profile, and profile photo? This cannot be undone.")) return;
  deleteAccountButton.disabled = true;
  setMessage("Deleting account…", "loading");
  const { data: sessionData } = await supabaseClient.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) {
    setMessage("Your session expired. Sign in again and retry.", "error");
    deleteAccountButton.disabled = false;
    return;
  }
  const { error } = await supabaseClient.functions.invoke("delete-account", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (error) {
    setMessage(`Account deletion failed: ${error.message}. Deploy the delete-account Edge Function and retry.`, "error");
    deleteAccountButton.disabled = false;
    return;
  }
  await supabaseClient.auth.signOut({ scope: "local" });
  window.location.replace("login.html?account=deleted");
});

year.textContent = new Date().getFullYear();
loadProfile();
