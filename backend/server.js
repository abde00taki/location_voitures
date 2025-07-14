const express = require('express');
const cors = require('cors');


const app = express();
const port = 8888;








app.use(cors());
app.use(express.json());

app.use('/api/cars', require('./routes/cars'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/rents', require('./routes/rents'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
