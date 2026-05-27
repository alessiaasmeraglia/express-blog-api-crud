import express from "express";

import {
    index,
    show,
    create,
    update,
    destroy,
} from "../controllers/posts.js";

import checkPostId from "../middlewares/checkPostId.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", checkPostId, show);
router.post("/", create);
router.put("/:id", checkPostId, update);
router.delete("/:id", checkPostId, destroy);

export default router;