import Review from "../models/review-models.js";
import User from "../models/user-models.js";

export const addReview = async (req, res) => {
    // const book_id = req.params.id;
    const { id, title, text } = req.body;
    console.log(req.headers, req.body, req.params);

    try {
        if (!req.userId) {
            return res.status(401).json({ msg: "You must be logged in to submit a review" });
        }
        const user = await User.findById(req.userId);
        const newReview = new Review({
            book_id: id,
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

// export const getReviews = async (req, res) => {
//     await Review
//         .find()
//         .sort({ date })
//         .then((reviews) => {
//             res.status(200).json(reviews)
//         })
// }

export const getReview = async (req, res) => {
    const book_id = req.params.id;
    try {
        await Review
            .find({book_id})
            .then((review) => {
                res.status(200).json(review)
            })
    } catch (err) {
        console.error(err);
    }
}

