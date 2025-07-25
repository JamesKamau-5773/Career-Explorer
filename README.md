# Career Explorer App

#### A comprehensive career exploration application built using React JS and Express.js as a demonstration for students learning full-stack web development.

#### By **James Kamau**

## Description

This is a full-stack career exploration application built using React JS for the frontend and Express.js for the backend API. The app demonstrates modern web development concepts including React components, state management, REST API integration, and responsive design. Users can explore different career paths, view detailed career information, add new careers, and manage their favorite career options.

## Screenshot

![Career Explorer App Screenshot](./public/career-explorer-screenshot.png.png)

## Features

- Career Exploration: Browse through a comprehensive list of career options
- Detailed Career Views: View in-depth information about specific careers
- Add New Careers: Contribute new career paths to the database
- Favorites System: Mark and manage favorite career options
- Responsive Design: Works seamlessly on desktop, tablet, and mobile devices
- Real-time Updates: Dynamic content updates without page refreshes
- Search and Filter: Find careers based on specific criteria
- Modern UI/UX: Clean and intuitive user interface

## How to Use

### Requirements

- A computer, tablet, or phone
- Access to the internet
- A modern web browser

### View Live Site

Visit the deployed application at: [Career Explorer App](https://jameskamau-career-explorer.netlify.app/)

The live site allows you to:

- Browse through the comprehensive list of career options
- Click on any career to view detailed information
- Add new career paths to expand the database
- Mark careers as favorites for easy access
- Use the responsive interface on any device

### Local Development

If you want to run the project locally, you'll need:

- Node.js (version 18 or higher) installed on your computer
- Basic understanding of React JS and Express.js
- Code editor (VS Code recommended)
- Terminal/Command Line

#### Installation Process

1. Clone this repository using:

   ```bash
   git clone https://github.com/JamesKamau-5773/Career-Explorer.git
   ```

   or by downloading a ZIP file of the code.

2. Navigate to the project directory:

   ```bash
   cd Career-Explorer
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Build the application:

   ```bash
   npm run build
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. For the backend server, run:

   ```bash
   npm start
   ```

7. Open your browser and visit `http://localhost:5173` for the frontend

## Technologies Used

- Frontend:
  - React JS (v19.1.0)
  - React Router DOM (v7.7.1)
  - Vite (v4.5.0)
  - CSS3
  - JavaScript (ES6+)

- Backend:
  - Express.js (v4.18.0)
  - Node.js
  - CORS middleware
  - JSON file-based database

- Development Tools:
  - ESLint for code linting
  - Vite for build tooling
  - Git for version control

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/careers` - Retrieve all careers
- `GET /api/careers/:id` - Retrieve a specific career
- `POST /api/careers` - Add a new career
- `PUT /api/careers/:id` - Update an existing career
- `DELETE /api/careers/:id` - Delete a career
- `POST /api/careers/:id/favorite` - Toggle favorite status
- `GET /health` - Health check endpoint

## Related Repositories

### Backend API

- Repository: [Career Explorer Backend](https://github.com/JamesKamau-5773/Career-Explorer)
- Deployed API: [Live API URL](https://career-explorer-4.onrender.com)

## Deployment

### Frontend Deployment (Netlify)
- Platform: Netlify
- Build Command: `npm run build`
- Publish Directory: `dist`
- Live URL: [Career Explorer Frontend](https://jameskamau-career-explorer.netlify.app/)

### Backend Deployment (Render)
- Platform: Render
- Build Command: `npm install`
- Start Command: `npm start`
- Live URL: [Career Explorer API](https://career-explorer-4.onrender.com)

## Project Structure

```
Career-Explorer/
├── public/
│   ├── _redirects
│   ├── db.json
│   └── vite.svg
├── src/
│   ├── Components/
│   │   └── Api.jsx
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── dist/
├── node_modules/
├── Server.cjs
├── netlify.toml
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Support and Contact Details

If you have any questions, suggestions, or need assistance, please contact:


- GitHub: [@JamesKamau-5773](https://github.com/JamesKamau-5773)

## License

MIT License

Copyright &copy; 2025 James Kamau

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
