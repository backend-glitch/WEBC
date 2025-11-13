const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const newsContainer = document.getElementById("newsContainer");

const apiKey = "24813fea23bb478fbc9ec9d1444f95d1"; // replace with your NewsAPI key

async function fetchNews(query = "") {
  newsContainer.innerHTML = "⏳ Fetching news...";
  try {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok" || data.articles.length === 0) {
      newsContainer.innerHTML = "❌ No news found.";
      return;
    }

    newsContainer.innerHTML = data.articles
      .map(article => `
        <div class="news-card">
          <h3>${article.title}</h3>
          <p>${article.description || ""}</p>
          ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news image">` : ""}
          <p>Source: ${article.source.name}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `).join("");
  } catch (err) {
    newsContainer.innerHTML = "⚠️ Error fetching news.";
    console.error(err);
  }
}

searchBtn.addEventListener("click", () => {
  fetchNews(searchInput.value.trim());
});

// load top headlines on page load
fetchNews();
