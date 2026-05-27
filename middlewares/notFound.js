function notFound(req, res, next) {
    res.status(404).json({
        error: "Endpoint non trovato",
        message: `La rotta ${req.originalUrl} non esiste`,
    });
}

export default notFound;