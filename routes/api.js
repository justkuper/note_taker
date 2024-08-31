const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// Define other API routes here if necessary
api.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(data));
});
api.post('/', async (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('Note added');
  } else {
    res.error('Error in adding note');
  }
});
module.exports = api;
