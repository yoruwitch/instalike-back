import { getAllPosts } from "../models/postsModel.js";

getAllPosts
export async function listPosts(req, res) {
    // Obtém todos os posts usando a função getAllPosts
    const posts = await getAllPosts();
    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}
