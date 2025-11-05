import React, { useState } from 'react';
import useGithubRepos from '../hooks/UseGithubRepos';

const Projects = () => {
  const { repos, loading, error } = useGithubRepos('aswanjay');
  const [filter, setFilter] = useState('all');

  const filteredRepos = repos.filter((repo) => {
    if (filter === 'all') return true;
    return repo.language === filter;
  });

  if (loading) return <p>Loading repos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>My GitHub Projects</h2>

      {/* ✅ Add filtering buttons here */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>🌐 All</button>
        <button onClick={() => setFilter('JavaScript')}>🟨 JavaScript</button>
        <button onClick={() => setFilter('Python')}>🐍 Python</button>
        <button onClick={() => setFilter('CSS')}>🎨 CSS</button>
      </div>

      {/* ✅ Display filtered repos */}
      <div className="repo-grid">
        {filteredRepos.length === 0 ? (
          <p>No repos found for "{filter}"</p>
        ) : (
          filteredRepos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>
              <p className="repo-language">{repo.language || 'Unknown'}</p>
              <p>{repo.description || 'No description provided.'}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
