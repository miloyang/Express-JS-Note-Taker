const notes = require('express').Router();

// Helper function to generate unique ids
const uuid = require('../helpers/uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {


  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((db) => db.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
        console.info("DELETE request received for notes");
      });
  });

// POST Route for submitting notes
notes.post('/', (req, res) => {
  
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNotes = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json');

    res.json({message: 'New notes created!'});
  } else {
    res.json('Error in creating your notes. Please try again.');
  }
});

module.exports = notes;
