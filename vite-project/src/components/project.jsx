import React, { useState, useEffect } from 'react';
import useGithubRepos from '../hooks/UseGithubRepos';
import RepoList from './RepoList'; // Make sure this component exists

const Projects = () => {
  const { repos, loading, error } = useGithubRepos('aswanjay');
  const [showButton, setShowButton] = useState(false);

  const groupedRepos = {
    featured: repos.filter(repo => repo.topics?.includes('featured')),
    frontend: repos.filter(repo => repo.topics?.includes('frontend')),
    backend: repos.filter(repo => repo.topics?.includes('backend')),
    fullstack: repos.filter(repo => repo.topics?.includes('fullstack')),
    sandbox: repos.filter(repo => repo.topics?.includes('sandbox')),
  };

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
    <section className="projects">
      <h2>My GitHub Projects</h2>

      {/* ✅ Grouped Repo Sections */}
      <h3>🌟 Featured Projects</h3>
      <RepoList repos={groupedRepos.featured} />

      <h3>🎨 Frontend UI/UX</h3>
      <RepoList repos={groupedRepos.frontend} />

      <h3>🔧 Backend/API</h3>
      <RepoList repos={groupedRepos.backend} />

      <h3>🧩 Fullstack Builds</h3>
      <RepoList repos={groupedRepos.fullstack} />

      <h3>🧪 Sandbox Experiments</h3>
      <RepoList repos={groupedRepos.sandbox} />

      {/* ✅ Scroll to Top Button */}
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