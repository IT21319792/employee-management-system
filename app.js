const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/database');


dotenv.config();

const app = express();
app.use(bodyParser.json());


const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const roleRoutes = require('./routes/roleRoutes');


app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/roles', roleRoutes);


db.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(3000, () => console.log('Server started on port 3000'));
  })
  .catch(err => console.log('Error: ' + err));
