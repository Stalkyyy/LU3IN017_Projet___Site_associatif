const express = require("express");
const Comments = require("../entities/comments.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());



    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });




    const comments = new Comments(db);
    router.delete("/id/:comment_id", async (req, res, next) => {
        try {
            const ack = await comments.delete(req.params.comment_id);
            if (ack)
                res.send("ok");
            else
                res.sendStatus(404);
        }
        catch (e) {
            res.status(500).send(e);
        }
    });




    router.get("/msg/:message_id", async (req, res) => {
        try {
            const listComments = await comments.getList(req.params.message_id);
            if (!listComments)
                res.sendStatus(404);
            else
                res.send(listComments);
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    })


    router.put("/create", (req, res) => {
        const { idAuthor, idMessage, content} = req.body;
        if (!idAuthor || !idMessage || !content) {
            res.status(400).send("Missing fields");
        } else {
            comments.create(idAuthor, idMessage, content)
                .then((comment) => res.status(201).send(comment))
                .catch((err) => res.status(500).send(err));
        }
    });

    return router;
}



module.exports = init;