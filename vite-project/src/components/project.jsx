import React from 'react';
import useGithubRepos from '../hooks/UseGithubRepos';

const Projects = () => {
  const { repos, loading, error } = useGithubRepos('aswanjay');

  if (loading) return <p>Loading repos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <div key={repo.id} className="repo-card">
          <h3>{repo.name}</h3>
          <p>{repo.description || 'No description provided.'}</p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
      ))}
    </div>
  );
};

export default Projects;
