import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js'
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

app.use(express.json())
app.use(cors());

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

app.use('', router)

