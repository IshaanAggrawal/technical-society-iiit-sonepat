// server.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import blogRouter from "./routes/blogs.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/blogs", blogRouter);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
