import posts from "../data/posts.js";

function index(req, res) {
    res.json({
        message: "Lista dei post",
    });
}

export { index, show, create, update, destroy };