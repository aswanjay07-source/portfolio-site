import React, { useState, useEffect } from 'react';
import useGithubRepos from '../hooks/UseGithubRepos';

const Projects = () => {
  const { repos, loading, error } = useGithubRepos('aswanjay');
  const [filter, setFilter] = useState('all');
  const [showButton, setShowButton] = useState(false);

  const filteredRepos = repos.filter((repo) => {
    if (filter === 'all') return true;
    return repo.language === filter;
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="repo-list">
        {filteredRepos && filteredRepos.length > 0 ? (
          filteredRepos.map((repo, index) => (
            <div key={repo.id} className="repo-card" style={{ animationDelay: `${index * 100}ms` }}>

              <h3>{repo.name}</h3>
              <p className="repo-language">{repo.language || 'Unknown'}</p>
              <p>{repo.description || 'No description provided.'}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
              {repo.tags && (
                <div className="repo-tags">
                  {repo.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className="tag"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8 animate-fadeIn">
            🔍 No repos found matching your filters.
          </p>
        )}
      </div>

      {showButton && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ⬆️ Back to Top
        </button>
      )}
    </section>
  );
};

export default Projects;

