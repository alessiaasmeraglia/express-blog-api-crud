import posts from "../data/posts.js";

function index(req, res) {
    res.status(200).json({
        count: posts.length,
        items: posts,
    });
}

function show(req, res) {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            error: "L'id deve esesere un numero positivo",
            item: null,
        });

        return;
    }

    const post = posts.find((post) => post.id === id);

    if (!post) {
        res.status(404).json({
            error: `Post con id ${id} non trovato`,
            item: null,
        });

        return;
    }

    res.status(200).json({
        item: post,
    });
}

function create(req, res) {
    const newPostData = req.body;

    console.log("Dati ricevuti:", newPostData);

    res.status(201).json({
        message: "Stai provando a creare dei dati",
        dati: newPostData,
    });
}

function update(req, res) {
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

    res.status(200).json({
        message: `Modifica del post ${id}`,
    });
}


export { index, show, create, update, destroy };