import express from 'express';
const urouter = express.Router();

urouter.get('/', (req, res) => {
    res.send('Hello from server')
})

export default urouter;