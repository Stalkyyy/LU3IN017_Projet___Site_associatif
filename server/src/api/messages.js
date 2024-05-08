const express = require("express");
const Messages = require("../entities/messages.js");
const { ObjectId } = require('mongodb');

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




    const messages = new Messages(db);
    router
        .route("/id/:message_id")
        .get(async (req, res) => {
            try {
                const message = await messages.getId(req.params.message_id);
                if (!message)
                    res.sendStatus(404);
                else
                    res.send(message);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        .delete(async (req, res, next) => {
            try {
                const ack = await messages.delete(req.params.message_id);
                if (ack)
                    res.send("ok");
                else
                    res.sendStatus(404);
            }
            catch (e) {
                res.status(500).send(e);
            }
        });




    router.get("/forum/:type", async (req, res) => {
        try {
            const listMessages = await messages.getList({ forum: req.params.type });
            if (!listMessages)
                res.sendStatus(404);
            else
                res.send(listMessages);
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    })


    router.get("/user/:type/:user_id", async (req, res) => {
        try {
            const listMessages = await messages.getList({ forum: req.params.type, idAuthor: req.params.user_id });
            if (!listMessages)
                res.sendStatus(404);
            else
                res.send(listMessages);
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    })


    router.put("/create", (req, res) => {
        const { idAuthor, title, content, forum } = req.body;
        if (!idAuthor || !content || !forum) {
            res.status(400).send("Missing fields");
        } else {
            messages.create(idAuthor, title, content, forum)
                .then((message) => res.status(201).send(message))
                .catch((err) => res.status(500).send(err));
        }
    });


    router.post('/search', async (req, res) => {
        try {
            const { keywords, title, startDate, endDate, authorFirstname, authorLastname, isAdmin } = req.body;
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            const forumType = isAdmin ? { $in: ['public', 'private'] } : 'public'; 
                // Oui, si on est admin, alors on veut les messages publiques ET privés.

            const listMessages = await messages.search(keywords, title, start, end, authorFirstname, authorLastname, forumType);
            if (!listMessages)
                res.sendStatus(404);
            else
                res.send(listMessages);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    })

    return router;
}



module.exports = init;