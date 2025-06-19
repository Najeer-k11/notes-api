const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth'); // Import the auth middleware

let notes = [
  {
    id: 1,
    title: "First Note",
    content: "This is the content of the first note."
  },
  {
    id: 2,
    title: "Second Note",
    content: "Here goes the second note content."
  },
  {
    id: 3,
    title: "Todo List",
    content: "- Buy groceries\n- Finish project\n- Call mom"
  }
];

let idCounter = 4; // start from next available ID

router.post('/notes', authenticate, (req, res) => {
  const { title, content } = req.body;
  const note = { id: idCounter++, title, content };
  notes.push(note);
  res.status(201).json(note);
});

router.get('/notes', authenticate, (req, res) => {
  res.json(notes);
});

router.get('/notes/:id', authenticate, (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  note ? res.json(note) : res.status(404).json({ message: 'Note not found' });
});

router.put('/notes/:id', authenticate, (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (note) {
    const { title, content } = req.body;
    note.title = title ?? note.title;
    note.content = content ?? note.content;
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

router.delete('/notes/:id', authenticate, (req, res) => {
  const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (noteIndex !== -1) {
    const deletedNote = notes.splice(noteIndex, 1);
    res.json(deletedNote[0]);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

module.exports = router;
