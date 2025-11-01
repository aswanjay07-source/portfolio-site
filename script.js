// 🌙 Dark Mode Persistence
window.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  toggleButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem('theme', newTheme);
    toggleButton.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
});

// ✨ Section Reveal Animation
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// 🔐 GitHub Token and Query
const GITHUB_TOKEN = "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";
const pinnedReposQuery = `
{
  viewer {
    pinnedItems(first: 6, types: [REPOSITORY]) {
      nodes {
        name
        description
        url
        stargazerCount
        primaryLanguage {
          name
        }
      }
    }
  }
}
`;

// 🎯 Fetch and Render Repos
function fetchPinnedRepos() {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: pinnedReposQuery }),
  })
    .then(response => response.json())
    .then(data => {
      const repos = data?.data?.viewer?.pinnedItems?.nodes;
      if (!repos) throw new Error("Unexpected API structure");
      renderRepos(repos);
    })
    .catch(error => {
      console.error("GitHub API error:", error);
    });
}

function renderRepos(repos) {
  const container = document.getElementById("repo-container");
  container.innerHTML = "";

  repos.forEach(repo => {
    const card = document.createElement("div");
    card.classList.add("repo-card");

    const description = repo.description || "No description provided.";
    const language = repo.primaryLanguage?.name;
    const stars = repo.stargazerCount ?? 0;

    card.innerHTML = `
      <h3><a href="${repo.url}" target="_blank">📁 ${repo.name}</a></h3>
      <p>${description}</p>
      ${language ? `<p>🖥️ <strong>Language:</strong> ${language}</p>` : ""}
      <p>⭐ <strong>Stars:</strong> ${stars}</p>
    `;

    container.appendChild(card);
  });
}

// 🚀 Load repos on page load
fetchPinnedRepos();