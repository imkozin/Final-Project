import {Schema, model} from 'mongoose';
// import User from './user-models';

const reviewSchema = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }, 
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
});

const Review = model('Review', reviewSchema);

export default Review;