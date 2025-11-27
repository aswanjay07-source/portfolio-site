import { useState, useEffect } from 'react';

const useGithubRepos = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Debug: confirm token is loaded
      console.log("Loaded token:", import.meta.env.VITE_GITHUB_TOKEN);

        const res = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
          }
        });

        if (!res.ok) {
          const message = `GitHub API error: ${res.status} ${res.statusText}`;
          console.error(message);
          throw new Error('Failed to fetch repos');
        }

        const data = await res.json();

        const enriched = data.map(repo => ({
          ...repo,
          tags: repo.topics?.length ? repo.topics : ['demo', 'portfolio']
        }));

        setRepos(enriched);
      } catch (err) {
        console.error("GitHub fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
};

export default useGithubRepos;

