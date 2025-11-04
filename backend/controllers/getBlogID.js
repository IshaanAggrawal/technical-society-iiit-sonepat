//Get a Single Blog
import {db} from "../firebase/firebase.js";

export const getBlogID = async (req, res) => {
    try {
        const {id} = req.params;
        const blogDoc = await db.collection("blogs").doc(id).get();

        if (!blogDoc.exists) {
            return res.status(404).json({message: "Blog not found"});
        }

        const commentsSnap = await db
            .collection("blogs")
            .doc(id)
            .collection("comments")
            .orderBy("createdAt", "asc")
            .get();

        const comments = commentsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json({id: blogDoc.id, ...blogDoc.data(), comments});
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({message: "Error fetching blog"});
    }
}