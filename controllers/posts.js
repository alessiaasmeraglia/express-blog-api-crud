import posts from "../data/posts.js";

function index(req, res) {
    res.status(200).json({
        count: posts.length,
        items: posts,
    });
}

export { index, show, create, update, destroy };