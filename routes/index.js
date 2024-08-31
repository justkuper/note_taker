const express = require('express');
const router = require('express').Router();

// Import our modular routers for /tips and /feedback

const notesRouter = require('./notes');
const apiRouter = require('./api');


// http://localhost:3001/api/notes
router.use('/notes', notesRouter);
// router.use('/api', apiRouter);

module.exports = router;