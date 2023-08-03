import express from 'express';
import dotenv from 'dotenv';
import brouter from './routes/books.js'

const app = express()
dotenv.config()

app.set('view engine', 'ejs')

app.use('/books', brouter)

app.listen(process.env.PORT||3001, ()=>{
    console.log(`run on port ${process.env.PORT||3001}`);
  })