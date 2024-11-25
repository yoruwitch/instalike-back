import express from "express";
import multer from "multer";
import {
    listPosts,
    createNewPost,
    uploadImage,
} from "../controllers/postsController.js";

// configuração do multer para windows
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
    // Endpoint para obter todos os posts
    app.get("/posts", listPosts);
    app.post("/posts", createNewPost);
    app.post("/upload", upload.single("image"), uploadImage);
};

export default routes;
