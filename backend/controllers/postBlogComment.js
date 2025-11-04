//Post Comments on that Blog
import {db} from "../firebase/firebase.js";

export const postBlogComment = async (req, res) => {
    try {
        const {id} = req.params;
        const {author, comment} = req.body;

        if (!comment) {
            return res.status(400).json({message: "Comment required"});
        }

        const blogRef = db.collection("blogs").doc(id);
        const blog = await blogRef.get();

        if (!blog.exists) {
            return res.status(404).json({message: "Blog not found"});
        }

        const newComment = {
            author: author || "Anonymous",
            comment,
            createdAt: new Date().toISOString(),
        };

        const commentRef = await blogRef.collection("comments").add(newComment);
        res.status(201).json({id: commentRef.id, ...newComment});
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({message: "Error adding comment"});
    }
}