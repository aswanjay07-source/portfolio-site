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
    const topics = repo.repositoryTopics?.nodes.map(t => t.topic.name) || [];

    const card = document.createElement('div');
    card.classList.add('repo-card');
    card.setAttribute('data-topic', topics.join(' ')); // 🔥 for filtering

    card.innerHTML = `
      <h3><a href="${repo.url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description || 'No description provided.'}</p>
      <div class="topics">${topics.map(t => `<span class="tag">${t}</span>`).join(' ')}</div>
    `;

    container.appendChild(card);
  });
}
// 🔍 Setup Filtering Function
function setupFiltering() {
  const buttons = document.querySelectorAll('#filter-buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      const cards = document.querySelectorAll('.repo-card');

      cards.forEach(card => {
        const topics = card.getAttribute('data-topic');
        const match = filter === 'all' || topics.includes(filter);
        card.style.display = match ? 'block' : 'none';
      });
    });
  });
}

// 🚀 Fetch and Render GitHub Pinned Repos
requestIdleCallback(() => {
  fetchPinnedRepos();
});

function fetchPinnedRepos() {
  fetch('http://localhost:3000/api/pinned')
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
