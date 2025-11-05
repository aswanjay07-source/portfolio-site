import React from 'react';
import Projects from './components/Projects';
import './App.css'
function App() {
  return (
    <div className="app-container">
      <Projects />
      <header>
        <h1>Aswan Jay</h1>
        <p className="tagline">Fullstack Web Developer • UI/UX Enthusiast • API Integrator</p>
      </header>

      <section className="bio">
        <h2>About Me</h2>
        <p>
          I'm Aswan Jay, an aspiring fullstack developer passionate about building secure, responsive, and visually engaging web experiences. I specialize in API integrations, animated UI/UX, and professional documentation. My toolkit includes VS Code, Postman, GitHub Desktop, and a deep love for semantic HTML and clean design.
        </p>
      </section>

      <section className="quick-links">
  <h2>Quick Links</h2>
  <ul>
    <li><a href="https://github.com/aswanjay07" target="_blank">GitHub Profile</a></li>
    <li><a href="https://cozy-tartufo-75ec8d.netlify.app" target="_blank">Live Portfolio Site</a></li>
  </ul>
</section>

      <section className="contact">
        <h2>Contact</h2>
        <p>Reach me via <a href="mailto:aswanjay07@gmail.com">aswanjay07@gmail.com</a> or use the contact form on my site.</p>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Aswan Jay. Built with Vite + React.</p>
      </footer>
    </div>
  )
}

export default App
