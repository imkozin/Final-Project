import mongoose from 'mongoose';

const db = mongoose.connection

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

export const start = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the MongoDB database');
    } catch (e) {
        console.error('Error connecting to the database', e);
    }
}