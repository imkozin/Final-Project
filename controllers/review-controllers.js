import Review from "../models/review-models.js";
import User from "../models/user-models.js";

export const createReview = async (req, res) => {
    const book_id = req.params.id;
    const {title, text} = req.body;
    const user = await User.findById(req.userId)
    try {
        const newReview = new Review({
            book_id,
            username: user.name,
            title,
            text,
            author: req.userId,
        });
        const savedReview = await newReview.save();
        return res.status(200).json({review: savedReview, msg: "Review added successfully"})
    } catch (error) {
        res.json({msg : "Something went wrong"})
    }
};