const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/pinned', (req, res) => {
  res.json([
    {
      name: 'react-migration',
      description: 'Migrated vanilla JS to React components',
      url: 'https://github.com/aswanjay07-source/react-migration'
    },
    {
      name: 'portfolio-site',
      description: 'Live portfolio with animations and contact form',
      url: 'https://github.com/aswanjay07-source/portfolio-site'
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});