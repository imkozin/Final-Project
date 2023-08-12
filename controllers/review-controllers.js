import Review from "../models/review-models.js";
import User from "../models/user-models.js";

export const addReview = async (req, res) => {
    const book_id = req.params.id;
    const { title, text } = req.body;
    
    try {
        if (!req.userId) {
            return res.status(401).json({ msg: "You must be logged in to submit a review" });
        }
        const user = await User.findById(req.userId);
        const newReview = new Review({
            book_id,
            username: user.name,
            title,
            text,
            author: req.userId,
        });

        const savedReview = await newReview.save();

        res.status(200).json({ review: savedReview, msg: "Review submitted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "An error occurred while submitting the review" });
    }
};