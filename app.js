const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const companyRoutes = require('./src/routes/company.routes');
const teamRoutes = require('./src/routes/team.routes');
const projectRoutes = require('./src/routes/projects.routes');
const taskRoutes = require('./src/routes/task.routes');

// Mount all routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

module.exports = app;
