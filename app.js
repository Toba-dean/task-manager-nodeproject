const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const tasks = require('./routes/task')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handling')
require('dotenv').config()

app.use(express.static('./task-public'))

// parse form data
app.use(express.json());

// ROUTES
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log('Server is listening...');
    })
  } catch (error) { 
    console.log(error.message); 
  }
}   
 
start()
