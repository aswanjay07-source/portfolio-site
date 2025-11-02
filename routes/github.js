const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/repos', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
});

router.get('/pinned', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.github.com/graphql',
      {
        query: `
          {
            viewer {
              pinnedItems(first: 6, types: [REPOSITORY]) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                  }
                }
              }
            }
          }
        `
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('GraphQL error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch pinned repos' });
  }
});

// ✅ Export after all routes are defined
module.exports = router;