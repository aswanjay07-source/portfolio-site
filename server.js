const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();

const githubRoutes = require('./routes/github');
app.use(cors());
app.use('/api', githubRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
