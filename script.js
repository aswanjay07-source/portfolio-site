// 🌙 Dark Mode Persistence
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';

  applyTheme(savedTheme);

  toggleButton.addEventListener('click', () => {
    const newTheme = document.body.classList.toggle('dark-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }
});

// ✨ Section Reveal Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));

// 🔐 GitHub Token and Query
const GITHUB_TOKEN = 'process.env.GITHUB_TOKEN';
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
        repositoryTopics(first: 5) {
          nodes {
            topic {
              name
            }
          }
        }
      }
    }
  }
}`;

// 📝 Render Repos Function
function renderRepos(repos) {
  const container = document.getElementById('repo-container');
  container.innerHTML = '';

  repos.forEach(repo => {
    const card = document.createElement('div');
    card.classList.add('repo-card');

    const description = repo.description || 'No description provided.';
    const language = repo.primaryLanguage?.name;
    const stars = repo.stargazerCount ?? 0;
    const topics = repo.repositoryTopics?.nodes?.map(n => n.topic.name) || [];
    const tags = topics.length ? topics.join(',') : 'untagged';
    card.dataset.tags = tags;

    card.innerHTML = `
      <h3><a href="${repo.url}" target="_blank">📁 ${repo.name}</a></h3>
      <p>${description}</p>
      ${language ? `<p>🖥️ <strong>Language:</strong> ${language}</p>` : ''}
      <p>⭐ <strong>Stars:</strong> ${stars}</p>
      <div class="tags">Tags: ${tags}</div>
    `;

    container.appendChild(card);
  });
}

// 🧪 Setup Filtering
function setupFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const tag = button.dataset.tag;
      document.querySelectorAll('.repo-card').forEach(card => {
        const cardTags = card.dataset.tags?.split(',') || [];
        card.style.display = (tag === 'all' || cardTags.includes(tag)) ? 'block' : 'none';
      });
    });
  });
}

// 🚀 Fetch and Render GitHub Pinned Repos
requestIdleCallback(() => {
  fetchPinnedRepos();
});

function fetchPinnedRepos() {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query: pinnedReposQuery })
  })
    .then(response => response.json())
    .then(data => {
      const repos = data?.data?.viewer?.pinnedItems?.nodes;
      if (!repos) throw new Error('Unexpected API structure');

      renderRepos(repos);
      setupFiltering();
    })
    .catch(error => {
      console.error('Error fetching pinned repos:', error);
    });
}