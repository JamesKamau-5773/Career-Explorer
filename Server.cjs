const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'dist')));

// Load and serve the JSON data
let dbData = {};
try {
  const dbPath = path.join(__dirname, 'src/db.json');
  dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (error) {
  console.error('Error loading database:', error);
  dbData = { careers: [] };
}

// API routes
app.get('/api/careers', (req, res) => {
  res.json(dbData.careers || []);
});

app.get('/api/careers/:id', (req, res) => {
  const career = dbData.careers?.find(c => c.id === parseInt(req.params.id));
  if (career) {
    res.json(career);
  } else {
    res.status(404).json({ error: 'Career not found' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
});
