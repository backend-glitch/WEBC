const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");
const input = document.getElementById("username");
const loadingBarContainer = document.getElementById("loading-bar-container");

async function getUser(username) {
  // Reset result
  result.classList.remove("show");
  result.innerHTML = "";
  
  // Show loading bar
  loadingBarContainer.classList.remove("hidden");

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, { cache: "no-cache" });

    // Rate limit info
    const remaining = res.headers.get('X-RateLimit-Remaining');
    const resettime = res.headers.get('X-RateLimit-Reset');
    const resetDate = new Date(resettime * 1000); // convert to JS date

    console.log("Remaining requests:", remaining);
    console.log("Reset at:", resetDate.toLocaleString());

    // Handle rate limit exceeded
    if (res.status === 403) {
      const now = Date.now();
      const resetTime = resettime * 1000;
      const diff = resetTime - now;

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      throw new Error(`Rate limit reached. Come back after ${minutes}m ${seconds}s`);
    }

    if (!res.ok) throw new Error("User not found 😢");

    const data = await res.json();

    // Display user info
    result.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}">
      <h3>${data.name || "No name available"}</h3>
      <p>${data.bio || "No bio available"}</p>
      <p>📦 Public Repos: ${data.public_repos}</p>
      <p>👥 Followers: ${data.followers} | Following: ${data.following}</p>
      <a href="${data.html_url}" target="_blank">View Profile 🔗</a>
    `;

  } catch (err) {
    result.innerHTML = `<p style="color:red;">${err.message}</p>`;
  } finally {
    // Hide loading bar after slight delay
    setTimeout(() => {
      loadingBarContainer.classList.add("hidden");
      result.classList.add("show");
    }, 1100);
  }
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const username = input.value.trim();
  if (username) getUser(username);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
