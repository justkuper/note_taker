const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
// http://localhost:3001/api/notes/
notes.get('/', (req, res) => {
  console.log('GET /api/notes');
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
// http://localhost:3001/api/notes/1
notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((notes) => {
      const result = notes.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETE Route for a specific note
notes.delete('/:noteId', async (req, res) => {
  const noteId = req.params.noteId;
  const notes = await readFromFile('./db/db.json')
  const result = JSON.parse(notes).filter((note) => note.id !== noteId);
  console.log(noteId);
  console.log(result);
  console.log(notes);
  // Save that array to the filesystem
  await writeToFile('./db/db.json', result);

  // Respond to the DELETE request
  res.json(`Item ${noteId} has been deleted 🗑️`);
});

// POST Route for a new note
notes.post('/', async (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newnote = {
      title,
      text,
      id: uuidv4(),
    };


    const parseData = await readAndAppend(newnote, './db/db.json');
    res.json(parseData);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;