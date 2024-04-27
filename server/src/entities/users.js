const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const saltRounds = 10;

class Users {
    constructor(db) {
        this.db = db
    }

    async create(mail, password, lastname, firstname) {
        try {
            const user = {
                mail,
                password : await bcrypt.hash(password, 10),
                lastname,
                firstname,
                status: "invitation"
            };
    
            console.log('Inserting user:', user);
            const result = await this.db.collection('users').insertOne(user);
            console.log('Insert result:', result);
    
            if (result.acknowledged)
                return { _id: result.insertedId, ...user }; // Retourne le document inséré
             else 
                throw new Error('Failed to insert user into database');
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }

    async get(userid) {
        try {
            const user = await this.db.collection('users').findOne({ _id: new ObjectId(userid) });
            return user;
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }

    async exists(mail) {
        try {
            const user = await this.db.collection('users').findOne({ mail });
            return user
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }

    async checkpassword(mail, password) {
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

                return isMatch ? user._id : null;
            }
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }
}

module.exports = Users;

