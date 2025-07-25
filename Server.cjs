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

app.post('/api/careers', (req, res) => {
  console.log('POST /api/careers requested', req.body);
  try {
    const newCareer = {
      id: Date.now(), // Simple ID generation
      ...req.body,
      createdAt: new Date().toISOString()
    };

    if (!dbData.careers) {
      dbData.careers = [];
    }

    dbData.careers.push(newCareer);

    // Save to file (optional - for persistence)
    try {
      const dbPath = path.join(__dirname, 'src/db.json');
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    } catch (writeError) {
      console.warn('Could not save to file:', writeError.message);
    }

    res.status(201).json(newCareer);
  } catch (error) {
    console.error('Error adding career:', error);
    res.status(500).json({ error: 'Failed to add career' });
  }
});

app.put('/api/careers/:id', (req, res) => {
  console.log(`PUT /api/careers/${req.params.id} requested`, req.body);
  try {
    const careerIndex = dbData.careers?.findIndex(c => c.id === parseInt(req.params.id));

    if (careerIndex === -1 || careerIndex === undefined) {
      return res.status(404).json({ error: 'Career not found' });
    }

    dbData.careers[careerIndex] = {
      ...dbData.careers[careerIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    // Save to file (optional - for persistence)
    try {
      const dbPath = path.join(__dirname, 'src/db.json');
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    } catch (writeError) {
      console.warn('Could not save to file:', writeError.message);
    }

    res.json(dbData.careers[careerIndex]);
  } catch (error) {
    console.error('Error updating career:', error);
    res.status(500).json({ error: 'Failed to update career' });
  }
});

app.delete('/api/careers/:id', (req, res) => {
  console.log(`DELETE /api/careers/${req.params.id} requested`);
  try {
    const careerIndex = dbData.careers?.findIndex(c => c.id === parseInt(req.params.id));

    if (careerIndex === -1 || careerIndex === undefined) {
      return res.status(404).json({ error: 'Career not found' });
    }

    const deletedCareer = dbData.careers.splice(careerIndex, 1)[0];

    // Save to file (optional - for persistence)
    try {
      const dbPath = path.join(__dirname, 'src/db.json');
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    } catch (writeError) {
      console.warn('Could not save to file:', writeError.message);
    }

    res.json({ message: 'Career deleted successfully', career: deletedCareer });
  } catch (error) {
    console.error('Error deleting career:', error);
    res.status(500).json({ error: 'Failed to delete career' });
  }
});

app.post('/api/careers/:id/favorite', (req, res) => {
  console.log(`POST /api/careers/${req.params.id}/favorite requested`);
  try {
    const careerIndex = dbData.careers?.findIndex(c => c.id === parseInt(req.params.id));

    if (careerIndex === -1 || careerIndex === undefined) {
      return res.status(404).json({ error: 'Career not found' });
    }

    dbData.careers[careerIndex].isFavorite = !dbData.careers[careerIndex].isFavorite;
    dbData.careers[careerIndex].updatedAt = new Date().toISOString();

    // Save to file (optional - for persistence)
    try {
      const dbPath = path.join(__dirname, 'src/db.json');
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    } catch (writeError) {
      console.warn('Could not save to file:', writeError.message);
    }

    res.json(dbData.careers[careerIndex]);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ error: 'Failed to toggle favorite' });
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
