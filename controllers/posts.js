import posts from "../data/posts.js";

function index(req, res) {
    res.status(200).json({
        count: posts.length,
        items: posts,
    });
}

function show(req, res) {
    const id = Number (req.params.id);

    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            error: "L'id deve esesere un numero positivo",
            item: null,
        });

        return;
    }
}

export { index, show, create, update, destroy };