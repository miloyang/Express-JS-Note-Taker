const express = require('express');
const path = require('path');
const db = require('./db/db.json');

// Import the notes router
const api = require('./routes/index');

const PORT = 3001;

const app = express();

// Middleware for parsing application/json
app.use(express.json());

// Middleware for urlecoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// Send all the requests that begin with /api to the index.js in the routes folder
app.use('/api', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    console.info('notes.html has been received')
});

// Wildcard route to direct users to the index.html page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT} 🚀`)
);