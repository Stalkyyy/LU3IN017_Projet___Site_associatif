const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const saltRounds = 10;

class Users {
    constructor(db) {
        this.db = db
    }

    async create(mail, password, lastname, firstname) {
        // Permet de créer un compte utilisateur.

        try {
            const user = {
                mail,
                password : await bcrypt.hash(password, 10),
                lastname,
                firstname,
                status: "invitation",
                date: new Date()
            };
    
            const result = await this.db.collection('users').insertOne(user);
    
            if (result.acknowledged)
                return { _id: result.insertedId, ...user }; // Retourne le document inséré
             else 
                throw new Error("Erreur lors de l'insertion dans la base de données.");
        } catch (err) {
            console.log('Erreur interne', err);
            throw err;
        }
    }



    async delete(userid) {
        // Permet de supprimer un compte utilisateur grâce à son ID.

        try {
            const result = await this.db.collection('users').deleteOne({ _id: new ObjectId(userid) });
    
            if (result.deletedCount === 1)
                return { message: 'User deleted successfully' };
            else
                throw new Error('User not found');
        } catch (err) {
            console.log('Erreur interne', err);
            throw err;
        }
    }



    async get(userid) {
        // Permet de récupérer les informatiosn d'un compte utilisateur (sauf mot de passe) grâce à son ID.

        try {
            const user = await this.db.collection('users').findOne({ _id: new ObjectId(userid) }, { projection: { password: 0 } });
            return user;
        } catch (err) {
            console.log('Erreur interne', err);
            throw err;
        }
    }



    async exists(mail) {
        // Permet de vérifier l'existence d'un compte utilisateur grâce à son mail (unique donc).

        try {
            const user = await this.db.collection('users').findOne({ mail }, { projection: { password: 0 } });
            return user
        } catch (err) {
            console.log('Erreur interne', err);
            throw err;
        }
    }



    async checkpassword(mail, password) {
        // Permet de comparer le mot de passe inscrit par l'utilisateur, et le mot de passe hashé.

        try {
            const user = await this.db.collection('users').findOne({ mail });
            if (!user) {
                return null;
            } else {
                const isMatch = await new Promise((resolve, reject) => {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });

                return isMatch ? user : null;
            }
        } catch (err) {
            console.log('Erreur interne', err);
            throw err;
        }
    }



    async getUsersPendingValidation() {
        // Permet de récupérer la liste des utilisateurs en attente de validation.

        try {
            const users = await this.db.collection('users').find({ status: 'invitation' }, { projection: { password: 0 } });
            return users.toArray();
        } catch (err) {
            console.log('Erreur interne', err);
            throw err;
        }
    }



    async changeUserStatus(userId, status) {
        // Permet de changer le statut d'un utilisateur (membre ou admin), grâce à son ID.

        try {
            const validStatuses = ['member', 'admin'];
            if (!validStatuses.includes(status))
                throw new Error('Statut invalide');
            
    
            const result = await this.db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $set: { status: status } }
            );
    
            if (result.matchedCount === 0) {
                console.log(`Utilisateur ${userId} introuvable.`);
                return null;
            }
    
            console.log(`Le statut utilisateur ${userId} a été mis à jour : ${status}`);
            return result;
        } catch (err) {
            console.log('Erreur interne', err);
            throw err;
        }
    }
}

module.exports = Users;

