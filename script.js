window.addEventListener('DOMContentLoaded', () => {
  // 🌙 Dark Mode Toggle
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

  // ✨ Section Reveal Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => observer.observe(section));

  // 🔁 Fetch and Render Repos
  fetchPinnedRepos();

  // 🔍 Setup Filtering
  setupFiltering();

  // ✉️ Contact Form Feedback
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        feedback.textContent = '✅ Message sent successfully!';
        feedback.style.color = 'green';
        form.reset();
      } else {
        feedback.textContent = '❌ Something went wrong. Try again.';
        feedback.style.color = 'red';
      }
    } catch (err) {
      feedback.textContent = '❌ Network error. Please check your connection.';
      feedback.style.color = 'red';
    }

    feedback.classList.add('show');
  });
});

// 🔧 Fetch Pinned Repos from Backend
async function fetchPinnedRepos() {
  try {
    const res = await fetch('http://localhost:3000/api/pinned');
    const data = await res.json();
    renderRepos(data.data.viewer.pinnedItems.nodes);
  } catch (err) {
    console.error('❌ Error fetching repos:', err);
  }
}

// 📝 Render Repos with Animated Tags
function renderRepos(repos) {
  const container = document.getElementById('repo-container');
  container.innerHTML = '';

  repos.forEach(repo => {
    const topics = repo.repositoryTopics?.nodes.map(t => t.topic.name) || [];

    const tagElements = topics.map((t, i) => {
      return `<span class="tag" style="--delay:${i * 0.1}s">${t}</span>`;
    }).join(' ');

    const card = document.createElement('div');
    card.classList.add('repo-card');
    card.setAttribute('data-topic', topics.join(' '));

    card.innerHTML = `
      <h3><a href="${repo.url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description || 'No description provided.'}</p>
      <div class="topics">${tagElements}</div>
    `;

    container.appendChild(card);
  });
}

// 🔍 Filter Repos by Topic
function setupFiltering() {
  const buttons = document.querySelectorAll('#filter-buttons button');
  const noReposMessage = document.getElementById('no-repos-message');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      const cards = document.querySelectorAll('.repo-card');

      let visibleCount = 0;

      cards.forEach(card => {
        const topics = card.getAttribute('data-topic');
        const match = filter === 'all' || topics.includes(filter);

        if (match) {
          card.classList.remove('hidden');
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.classList.add('hidden');
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });

      noReposMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  });
}