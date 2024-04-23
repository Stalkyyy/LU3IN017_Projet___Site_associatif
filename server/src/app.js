const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const auth = require('./api/auth.js');
const users = require('./api/users.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const express = require('express');
const app = express()
const session = require("express-session");
const cors = require('cors');


app.use(session({
    secret: 'technoweb rocks',
    resave: false,
    saveUninitialized: true
}));

app.use(cors({ 
    origin: 'http://localhost:5173' ,
    credentials: true
}));


(async () => {
    try {
        const clientDB = new MongoClient('mongodb://localhost:27017');
        await clientDB.connect();
        const db = clientDB.db('db_LU3IN017');

        // Vérifie que la connexion à la base de données a réussi
        await db.command({ ping: 1 });

        app.use('/auth', auth(db));
        app.use('/user', users(db));

        // Démarre le serveur
        app.on('close', () => {
            clientDB.close();
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
})();


module.exports = app;