import posts from "../data/posts.js";


function validatePostData(data) {
    const errors = [];

    if (!data.title || typeof data.title !== "string") {
        errors.push("Il titolo è obbligatorio e deve essere una stringa");
    }

    if (!data.content || typeof data.content !== "string") {
        errors.push("Il contenuto è obbligatorio e deve essere una stringa");
    }

    if (!data.image || typeof data.image !== "string") {
        errors.push("L'immagine è obbligatoria e deve essere una stringa");
    }

    if (!Array.isArray(data.tags)) {
        errors.push("I tags sono obbligatori e devono essere un array");
    }

    if (!data.slug || typeof data.slug !== "string") {
        errors.push("Lo slug è obbligatorio e deve essere una stringa");
    }

    if (typeof data.published !== "boolean") {
        errors.push("Published è obbligatorio e deve essere true oppure false");
    }

    if (typeof data.prep_time !== "number" || data.prep_time <= 0) {
        errors.push("Prep_time è obbligatorio e deve essere un numero positivo");
    }

    return errors;
}

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

function destroy(req, res) {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            error: "L'id deve essere un numero positivo",
        });

        return;
    }

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        res.status(404).json({
            error: `Post con id ${id} non trovato`,
        });

        return;
    }

    posts.splice(postIndex, 1);

    console.log("Lista aggiornata dei post:", posts);

    res.sendStatus(204);
}


export { index, show, create, update, destroy };