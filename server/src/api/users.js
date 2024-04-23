const express = require("express");
const Users = require("../entities/users.js");

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




    const users = new Users(db);
    router
        .route("/:user_id")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));




    router.post("/create", async (req, res) => {
        const { mail, password, lastname, firstname } = req.body;
        console.log("test1");
        if (!mail || !password || !lastname || !firstname) 
            return res.status(400).json({
                status: 400,
                message: "Missing fields",
            });
        console.log("test2");
        if (await users.exists(mail)) 
            return res.status(401).json({
                status: 401,
                message: "Cette adresse mail est déjà utilisée."
            });
        console.log("test3");
        let userid = await users.create(mail, password, lastname, firstname);
        if (!userid) {
            req.session.destroy((err) => { });
            return res.status(403).json({
                status: 403,
                message: "Mail et/ou mot de passe invalide.s."
            });
        }

        req.session.regenerate((err) => {
            console.log("test");

            if (err)
                return res.status(500).json({
                    status: 500,
                    message: "Erreur interne"
                });

            req.session.mail = mail;
            req.session.userid = userid;
            res.status(200).json({
                status: 200,
                message: `Utilisateur ${userid._id} ajouté à la BDD`,
                session_key : req.session.id,
                mail: req.session.mail
            });
        })
    });

    return router;
}



module.exports = init;