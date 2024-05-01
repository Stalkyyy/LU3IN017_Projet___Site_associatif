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
    router.post("/login", async (req, res) => {
        try {
            const { mail, password } = req.body;

            // Erreur sur la requête HTTP
            if (!mail || !password)
            	return res.status(400).json({
                    status: 400,
                    message: "Requête invalide : mail et mot de passe nécessaires",
                    user: null
                });


            if(! await users.exists(mail))
            	return res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu",
                    user: null
                });


            const user = await users.checkpassword(mail, password);
            if (user)
                // Avec middleware express-session
                return req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne",
                            user: null
                        });
                    }

                    else {
                        // C'est bon, nouvelle session créée
                        req.session.mail = mail;
                        req.session.userid = user._id;
                         return res.status(200).json({
                            status: 200,
                            message: "Mail et mot de passe acceptés",
                            user: user
                        });
                    }
                });


            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            return res.status(403).json({
                status: 403,
                message: "Mot de passe invalide"
            });
        }
        catch (e) {
            return res.status(500).json({
                status: 500,
                message: "Erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });




    router.delete('/logout', async (req, res) => {
        req.session.destroy(err => {
            if (err)
                return res.status(500).send({
                    message: "Erreur interne", 
                    details: err.toString()
                });

            res.status(200).send({
                message: "Déconnexion réussie."
            });
        })
    });

    return router;
}



module.exports = init;