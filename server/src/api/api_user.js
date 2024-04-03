const express = require("express");
const Users = require("../entities/users.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log(`API: method ${req.method}, path ${req.path}`);
        console.log(`Body ${req.body}`);
        next();
    });

    const users = new Users.default(db);
    router.post("/user/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            // Erreur sur la requête HTTP
            if (!email || !password) {
                res.status(400).json({
                    status: 400,
                    message: "Requête invalide : email et password nécessaires"
                });
                return;
            }

            if (! await users.exists(email)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }

            let userid = await users.checkpassword(email, password);

            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }

                    else {
                        // C'est bon, nouvelle session créee
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Email et mdp acceptés"
                        });
                    }
                })
            }
        }
    })
}