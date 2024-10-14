const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/database');


dotenv.config();

const app = express();
app.use(bodyParser.json());


const employeeRoutes = require('./routes/employeeRoutes');
// const departmentRoutes = require('./routes/employeeRoutes');
// const roleRoutes = require('./routes/roleRoutes');


app.use('/employees', employeeRoutes);
// app.use('/departments', departmentRoutes);
// app.use('/roles', roleRoutes);


// Sync the models with the database
const syncDatabase = async () => {
  try {
      await sequelize.sync({ force: true }); // force: true will drop tables if they exist and recreate them
      console.log('Database & tables created!');
  } catch (error) {
      console.error('Error creating database tables:', error);
  }
};

syncDatabase(); // Call the function to sync the database


db.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(3000, () => console.log('Server started on port 3000'));
  })
  .catch(err => console.log('Error: ' + err));
