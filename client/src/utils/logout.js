export function logout() {
  // Remove JWT and any user info stored locally
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("spotifyId");

  window.location.assign("http://localhost:3002/auth/login");
}
