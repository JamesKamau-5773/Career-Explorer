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
let dbData = { careers: [] };
try {
  const dbPath = path.join(__dirname, 'src/db.json');
  if (fs.existsSync(dbPath)) {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    dbData = JSON.parse(rawData);
    console.log('Database loaded successfully');
  } else {
    console.log('Database file not found, using empty data');
  }
} catch (error) {
  console.error('Error loading database:', error);
  dbData = { careers: [] };
}

// API routes
app.get('/api/careers', (req, res) => {
  console.log('GET /api/careers requested');
  res.json(dbData.careers || []);
});

app.get('/api/careers/:id', (req, res) => {
  console.log(`GET /api/careers/${req.params.id} requested`);
  const career = dbData.careers?.find(c => c.id === parseInt(req.params.id));
  if (career) {
    res.json(career);
  } else {
    res.status(404).json({ error: 'Career not found' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application not built. Please run npm run build first.');
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📡 API available at http://localhost:${port}/api`);
  console.log(`🏠 App available at http://localhost:${port}`);
});
