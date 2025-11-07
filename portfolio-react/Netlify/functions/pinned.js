import fetch from 'node-fetch';

export async function handler(event, context) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const query = `
    query {
      viewer {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              languages(first: 3) {
                nodes {
                  name
                }
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
    console.error('❌ GitHub API error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch pinned repos' }),
    };
  }
}