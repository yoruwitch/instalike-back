import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads")) // servir arquivo estático
routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000...");
});
