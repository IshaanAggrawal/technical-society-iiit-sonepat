// Get Blogs
import {db} from "../firebase/firebase.js";
const getFirst50Words = (text) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    return words.slice(0, 50).join(" ") + (words.length > 50 ? "..." : "");
};

export const getBlogs = async (req, res) => {
    try {
        const snapshot = await db.collection("blogs").get();

        const blogs = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                author: data.author || "Anonymous",
                image: data.image || null,
                preview: getFirst50Words(data.content),
            };
        });

        res.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({message: "Error fetching blogs"});
    }
}