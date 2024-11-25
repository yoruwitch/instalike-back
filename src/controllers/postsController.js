import { getAllPosts, createPost } from "../models/postsModel.js";
import fs from "fs";

export async function listPosts(req, res) {
    // Obtém todos os posts usando a função getAllPosts
    const posts = await getAllPosts();
    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}

export async function createNewPost(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ Error: "Request failed" });
    }
}
export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "",
    };
    try {
        const createdPost = await createPost(newPost);
        const updatedImage = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ Error: "Request failed" });
    }
}
