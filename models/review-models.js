import {Schema, model} from 'mongoose';

const reviewSchema = new Schema({
    book_id: {type: Number, required: true},
    username: {type: String, required: true},
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }, 
    author: { type:  Schema.Types.ObjectId, ref: 'User', required: true } 
});

const Review = model('Review', reviewSchema);

export default Review;