import React from 'react';

const RepoList = ({ repos }) => {
  return (
    <div className="repo-list">
      {repos && repos.length > 0 ? (
        repos.map((repo, index) => (
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
          🔍 No repos found in this category.
        </p>
      )}
    </div>
  );
};

export default RepoList;