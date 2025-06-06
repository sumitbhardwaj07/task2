
const app = require('./app');
const db = require('./src/models');
require('dotenv').config();


const PORT = process.env.PORT || 3001;


(async () => {
  try {
    await db.sequelize.sync(); 
    console.log('Database connected');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})();


// const app = require('./app');
// const db = require('./src/models');
// require('dotenv').config();

// let dbInitialized = false;

// app.use(async (req, res, next) => {
//   if (!dbInitialized) {
//     try {
//       await db.sequelize.sync(); 
//       console.log('Database connected');
//       dbInitialized = true;
//     } catch (err) {
//       console.error('Database connection failed:', err);
//       return res.status(500).send('Database connection error');
//     }
//   }
//   next();
// });

// module.exports = app;