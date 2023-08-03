import express from 'express';
const brouter = express.Router();

brouter.get('/', (req, res) => {
    res.send('Hello from server')
})

export default brouter;