const path = require('path');
const fs = require('fs');

const express = require('express');

const app = express();

const filePath = path.join(__dirname, 'story', 'text.txt');

// Use the built-in express.json middleware to handle JSON requests
app.use(express.json());

// Route to get the story (read from text.txt)
app.get('/story', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to open file.' });
    }
    res.status(200).json({ story: data.toString() });
  });
});

// Route to post a new story (append to text.txt)
app.post('/story', (req, res) => {
  const newText = req.body.text;
  if (newText.trim().length === 0) {
    return res.status(422).json({ message: 'Text must not be empty!' });
  }

  fs.appendFile(filePath, newText + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Storing the text failed.' });
    }
    res.status(201).json({ message: 'Text was stored!' });
  });
});

// Set up the server to listen on port 3000
app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});

