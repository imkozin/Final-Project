import express from 'express';
import dotenv from 'dotenv';
import urouter from './routes/user-routes.js'
// import path from 'path';
import mongoose from 'mongoose';


const app = express();
dotenv.config();

app.use(express.json())
app.use('', urouter)

// app.get('/users', (req, res) => {
//   User.
// })


mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the MongoDB database');
}).catch((err) => {
  console.error('Error connecting to the database', err);
});

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`Server running on PORT ${process.env.PORT || 3001}`);
  })

