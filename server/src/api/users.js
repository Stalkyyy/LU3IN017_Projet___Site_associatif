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

    router.get("/invitation", async (req, res) => {
        try {
            const userlist = await users.getUsersPendingValidation();
            if (!userlist || userlist.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Aucun utilisateur en attente de validation",
                });
            }
    
            return res.status(200).json({
                status: 200,
                message: "Liste d'utilisateurs en attente trouvée.",
                data: userlist,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: 500,
                message: "Erreur interne.",
            });
        }
    });


    router.get("/:user_id", async (req, res) => {
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

    router.delete("/delete/:user_id", async (req, res) => {
        try {
            const result = await users.delete(req.params.user_id);
    
            if (result.message === 'User deleted successfully')
                res.status(200).json(result);
            else
                res.status(404).json({ message: 'User not found' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur interne.' });
        }
    });



    router.patch("/validation", async (req, res) => {
        const { status, userId } = req.body;
        if (!status || !userId)
            return res.status(400).json({
                status: 400,
                message: "Missing fields",
            });

        try {
            const result = await users.changeUserStatus(userId, status);
    
            if (!result)
                return res.status(404).json({
                    status: 404,
                    message: "Aucun utilisateur avec cet id.",
                });
    
            return res.status(200).json({
                status: 200,
                message: "Status mis à jour.",
            });
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({
                status: 500,
                message: "Erreur interne",
            });
        }
    })


    router.post("/create", async (req, res) => {
        const { mail, password, lastName, firstName } = req.body;
        if (!mail || !password || !lastName || !firstName) 
            return res.status(400).json({
                status: 400,
                message: "Missing fields",
            });

        if (await users.exists(mail)) 
            return res.status(401).json({
                status: 401,
                message: "Cette adresse mail est déjà utilisée."
            });

        let userid = await users.create(mail, password, lastName, firstName);
        if (!userid) {
            req.session.destroy((err) => { });
            return res.status(403).json({
                status: 403,
                message: "Mail et/ou mot de passe invalide.s"
            });
        }

        req.session.regenerate((err) => {
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