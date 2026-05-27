import posts from "../data/posts.js";

function checkPostId(req, res, next) {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            error: "L'id deve essere un numero positivo",
        });

        return;
    }

    const post = posts.find((post) => post.id === id);

    if (!post) {
        res.status(404).json({
            error: `Post con id ${id} non trovato`,
        });

        return;
    }

    req.post = post;
    req.postId = id;

    next();
}

export default checkPostId;