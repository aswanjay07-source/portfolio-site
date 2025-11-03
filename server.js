// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// Create app instance
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Optional: if you need to parse JSON bodies

// Routes
const githubRoutes = require('./routes/github');
app.use('/api', githubRoutes);

// Direct route for /api/pinned (optional if not handled in githubRoutes)
app.get('/api/pinned', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          {
            viewer {
              pinnedItems(first: 6, types: [REPOSITORY]) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    stargazerCount
                    primaryLanguage { name }
                    repositoryTopics(first: 10) {
                      nodes {
                        topic { name }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching GitHub data:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
