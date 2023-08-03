import express from 'express';
import dotenv from 'dotenv';
import urouter from './routes/users.js'

const app = express()
dotenv.config()

app.set('view engine', 'ejs')

app.use('/books', urouter)

app.listen(process.env.PORT||3001, ()=>{
    console.log(`run on port ${process.env.PORT||3001}`);
  })