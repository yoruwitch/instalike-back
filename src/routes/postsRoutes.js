import express from "express";
import { listPosts } from "../controllers/postsController.js";

const routes = (app) => {
    app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

    // Endpoint para obter todos os posts
    app.get("/posts", listPosts);
};

export default routes;
