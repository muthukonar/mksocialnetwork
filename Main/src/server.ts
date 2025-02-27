import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Ensure database connection is established before starting server
db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });
