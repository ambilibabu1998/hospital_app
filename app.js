// Import necessary modules
const express = require('express');
const fs = require('fs');

// Create Express app and set up JSON middleware
const app = express();
app.use(express.json());

// Read hospital data from JSON file
const hospitalData = JSON.parse(fs.readFileSync('hospitals.json'));

// CRUD operations

// GET all hospitals
app.get('/hospitals', (req, res) => {
  res.json(hospitalData.hospitals);
});

// GET a specific hospital by ID
app.get('/hospitals/:id', (req, res) => {
  const hospital = hospitalData.hospitals.find(h => h.id === parseInt(req.params.id));
  if (!hospital) return res.status(404).send('Hospital not found.');
  res.json(hospital);
});

// POST a new hospital
app.post('/hospitals', (req, res) => {
  const hospital = {
    id: hospitalData.hospitals.length + 1,
    name: req.body.name,
    patient_count: req.body.patient_count,
    location: req.body.location
  };
  hospitalData.hospitals.push(hospital);
  fs.writeFileSync('hospitals.json', JSON.stringify(hospitalData));
  res.json(hospital);
});

// PUT (update) an existing hospital
app.put('/hospitals/:id', (req, res) => {
  const hospital = hospitalData.hospitals.find(h => h.id === parseInt(req.params.id));
  if (!hospital) return res.status(404).send('Hospital not found.');

  hospital.name = req.body.name;
  hospital.patient_count = req.body.patient_count;
  hospital.location = req.body.location;
  fs.writeFileSync('hospitals.json', JSON.stringify(hospitalData));
  res.json(hospital);
});

// DELETE an existing hospital
app.delete('/hospitals/:id', (req, res) => {
  const hospitalIndex = hospitalData.hospitals.findIndex(h => h.id === parseInt(req.params.id));
  if (hospitalIndex === -1) return res.status(404).send('Hospital not found.');

  const hospital = hospitalData.hospitals.splice(hospitalIndex, 1)[0];
  fs.writeFileSync('hospitals.json', JSON.stringify(hospitalData));
  res.json(hospital);
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
