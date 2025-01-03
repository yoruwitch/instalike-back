import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

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

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImage,
            descricao: descricao,
            alt: req.body.alt,
        };
        const createdPost = await updatePost(id, post);

        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ Error: "Request failed" });
    }
}
