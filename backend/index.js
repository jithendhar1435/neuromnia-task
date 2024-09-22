const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let milestones = [];

// Load CSV into memory
fs.createReadStream('vb_mapp_milestones.csv')
  .pipe(csv())
  .on('data', (row) => {
    milestones.push(row);
  })
  .on('end', () => {
    console.log('CSV file loaded',milestones);
  });

// API Endpoint to handle chatbot actions
app.post('/api/chatbot', (req, res) => {
  const { action, code, domain, level } = req.body;
  console.log('Received request:', req.body);
  if (action === 'Lookup Milestone') {
    const milestone = milestones.find((m) => m.code === code);
    if (milestone) {
      res.json(milestone);
    } else {
      res.status(404).json({ message: 'Milestone not found' });
    }
  } else if (action === 'List Domain') {
    const filteredMilestones = milestones.filter(
      (m) => m.domain === domain && m.level === level
    );
    res.json(filteredMilestones);
  } else {
    res.status(400).json({ message: 'Invalid action' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
