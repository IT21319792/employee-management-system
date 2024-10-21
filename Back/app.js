const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/database');
const sequelize = require('./config/database'); // Make sure to import sequelize

dotenv.config();

const app = express();
app.use(express.json()); 
const cors = require('cors');
app.use(cors());

// Import associations
require('./models/associations');


const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentsRoutes');
const roleRoutes = require('./routes/rolesRoutes');
const employeeRolesRoutes = require('./routes/employeeRoleRoutes');
const authRoutes = require('./routes/authRoutes');


app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/roles', roleRoutes);
app.use('/employee-roles', employeeRolesRoutes);
app.use('/auth', authRoutes);



// Sync the models with the database
const syncDatabase = async () => {
  try {
      await sequelize.sync({ force: false }); // Change to false in production
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
