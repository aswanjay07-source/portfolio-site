import React from 'react';
import Projects from './components/projects';
import './App.css';

function App() {
  return (
    <main>
      <header>
        <h1>Aswan Jay</h1>
        <p>Fullstack Web Developer • UI/UX Enthusiast • API Integrator</p>
      </header>

      <Projects />

      <footer>
        <h2>About Me</h2>
        <p>
          I'm Aswan Jay, an aspiring fullstack developer passionate about building secure,
          responsive, and visually engaging web experiences. I specialize in API integrations,
          animated UI/UX, and professional documentation.
        </p>
        <p>
          Reach me via <a href="mailto:aswanjay07@gmail.com">aswanjay07@gmail.com</a> or use the
          contact form on my site.
        </p>
        <p>
          <a href="https://github.com/aswanjay">GitHub Profile</a> •{' '}
          <a href="https://dashing-liger-e55ab0.netlify.app">Live Portfolio Site</a>
        </p>
        <p>© 2025 Aswan Jay. Built with Vite + React.</p>
        <p>⬆️ <a href="#">Top</a></p>
      </footer>
    </main>
  );
}

export default App;

