const express = require('express')
const createTables = require('./db/setup');
const pool = require('./db/index');

const userRouter = require('./Routes/userRouter');

const app = express()
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use('/api', userRouter)

async function initializeApp() {
  try {
    await createTables(pool);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing app:', error.message);
  }
}

initializeApp();