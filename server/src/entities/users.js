class Users {
    constructor(db) {
        this.db = db;
    }

    create(firstname, lastname, email, password) {
        return new Promise((res, rej) => {
            let userid = 1; // A remplacer par une requête bd
            if (false) {
                //erreur
                rej();
            } else {
                res(userid);
            }
        });
    }

    get(userid) {
        return new Promise((res, rej) => {
            const user = {
                email: "email",
                password: "password",
                firstname: "firstname",
                lastname: "lastname"
            }; // A remplacer avec une requête bd

            if (false) {
                //erreur
                rej();
            } else {
                if (userid == 1) {
                    res(user);
                } else {
                    res(null);
                }
            }
        });
    }

    async exists(email) {
        return new Promise((res, rej) => {
            if (false) {
                //erreur
                rej();
            } else {
                res(true);
            }
        });
    }

    checkpassword(email, password) {
        return new Promise((res, rej) => {
            let userid = 1; // A remplacer par une requête bd
            if (false) {
                //erreur
                rej();
            } else {
                res(userid);
            }
        });
    }
}

exports.default = Users;