const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import process from 'process'; // Import process module

export const handler = async function () {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const query = `
    {
      viewer {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            name
            description
            url
            languages(first: 3) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('❌ GitHub GraphQL error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch pinned repos' }),
    };
  }
};
