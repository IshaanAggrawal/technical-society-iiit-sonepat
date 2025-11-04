// Post Blogs
import fs from "fs";
import {bucket, db} from "../firebase/firebase.js";

const uploadImageToFirebase = async (filePath, fileName) => {
    const storageFile = bucket.file(`blog-images/${fileName}`);
    await bucket.upload(filePath, {
        destination: storageFile.name,
        metadata: { contentType: "image/jpeg" },
    });
    await storageFile.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${storageFile.name}`;
};

export const postBlog = async (req, res) => {
    try {
        const {title, content, author} = req.body;
        let imageUrl = null;

        if (!title || !content) {
            return res.status(400).json({message: "Title and content required"});
        }

        // If an image is uploaded, store it in Firebase Storage
        if (req.file) {
            imageUrl = await uploadImageToFirebase(req.file.path, req.file.filename);
            fs.unlinkSync(req.file.path); // remove temp file
        }

        const newBlog = {
            title,
            content,
            author: author || "Anonymous",
            image: imageUrl,
            createdAt: new Date().toISOString(),
        };

        const docRef = await db.collection("blogs").add(newBlog);
        res.status(201).json({id: docRef.id, ...newBlog});
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({message: "Error creating blog"});
    }
}