import { useEffect, useState } from 'react';

function RepoList({ filter }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function fetchPinnedRepos() {
      try {
        const res = await fetch('/.netlify/functions/pinned');
        const data = await res.json();
        setRepos(data.data.viewer.pinnedItems.nodes);
      } catch (err) {
        console.error('❌ Error fetching repos:', err);
      }
    }
    fetchPinnedRepos();
  }, []);

  const filtered = repos.filter(repo => {
    const topics = repo.repositoryTopics?.nodes.map(t => t.topic.name).join(' ');
    return filter === 'all' || topics.includes(filter);
  });

  return (
    <div id="repo-container">
      {filtered.length === 0 ? (
        <p id="no-repos-message">No repos found.</p>
      ) : (
        filtered.map((repo) => (
          <div key={repo.name} className="repo-card" data-topic={repo.repositoryTopics?.nodes.map(t => t.topic.name).join(' ')}>
            <h3><a href={repo.url} target="_blank">{repo.name}</a></h3>
            <p>{repo.description || 'No description provided.'}</p>
            <div className="topics">
              {repo.repositoryTopics?.nodes.map((t, i) => (
                <span className="tag" style={{ '--delay': `${i * 0.1}s` }}>{t.topic.name}</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RepoList;
