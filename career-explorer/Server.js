const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'src/db.json'));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

server.use(middlewares);

// Serve static files from React build
server.use(jsonServer.defaults({
  static: path.join(__dirname, 'dist')
}));

// API routes
server.use('/api', router);

// Serve React app for all other routes
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
});