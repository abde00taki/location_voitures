const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/users');
// const rentRoutes = require('./routes/rents');

app.use('/cars', carRoutes);
app.use('/users', userRoutes);
// app.use('/rents', rentRoutes);

app.get('/', (req, res) => {
  res.send(' Location Voitures API with multer is running!');
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
