import express from "express";
import "dotenv/config";

import postsRouter from "./routers/posts.js";

import notFound from "./middlewares/notFound.js";
import errorsHandler from "./middlewares/errorsHandler.js";

const app = express();

const PORT = process.env.SERVER_PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Server del mio blog",
    });
});

app.use("/posts", postsRouter);

app.get("/test-error", (req, res, next) => {
    const error = new Error("Errore di test");
    next(error);
});

app.use(notFound);
app.use(errorsHandler);

app.listen(PORT, (error) => {
    if (error) {
        console.error("Errore durante l'avvio del server:", error);
        return;
    }

    console.log(`Server avviato su http://localhost:${PORT}`);
});