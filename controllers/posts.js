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
    let filteredPosts = posts;

    const { tag, title, published } = req.query;

    if (tag) {
        filteredPosts = filteredPosts.filter((post) =>
            post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
        );
    }

    if (title) {
        filteredPosts = filteredPosts.filter((post) =>
            post.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (published) {
        if (published !== "true" && published !== "false") {
            res.status(400).json({
                error: "Il filtro published deve essere true oppure false",
            });
            return;
        }
        const publishedValue = published === "true";
        filteredPosts = filteredPosts.filter(
            (post) => post.published === publishedValue
        );
    }
    res.status(200).json({
        count: filteredPosts.length,
        items: filteredPosts,
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

    const errors = validatePostData(newPostData);

    if (errors.length > 0) {
        res.status(400).json({
            error: "Dati non validi",
            details: errors,
        });
        return;
    }

    const newId = posts[posts.length - 1].id + 1;

    const newPost = {
        id: newId,
        title: newPostData.title,
        content: newPostData.content,
        image: newPostData.image,
        tags: newPostData.tags,
        slug: newPostData.slug,
        published: newPostData.published,
        prep_time: newPostData.prep_time,
        created_at: new Date().toISOString(),
    };

    posts.push(newPost);

    console.log("Lista aggiornata dei post:", posts);

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