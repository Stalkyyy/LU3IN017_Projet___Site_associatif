const { ObjectId } = require('mongodb');

class Messages {
    constructor(db) {
        this.db = db
    }

    async create(idAuthor, title, content, forum) {
        try {
            const message = {
                idAuthor,
                title,
                content, 
                forum,
                date: new Date(),
            };
    
            console.log('Inserting message:', message);
            const result = await this.db.collection('messages').insertOne(message);
            console.log('Insert message:', message);
    
            if (result.acknowledged)
                return { _id: result.insertedId, ...message }; // Retourne le document inséré
             else 
                throw new Error('Failed to insert message into database');
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }

    async getId(idAuthor) {
        try {
            const message = await this.db.collection('messages').findOne({ _id: new ObjectId(idAuthor) });
            return message;
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }

    async getList(query = {}) {
        try {
            const cursorListMessages = await this.db.collection('messages')
                .find(query)
                .sort({ date : -1 });
            return cursorListMessages.toArray();
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }

    async delete(message_id) {
        try {
            const result = await this.db.collection('messages').deleteOne({ _id: new ObjectId(message_id) });
            return result.acknowledged;
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }
}

module.exports = Messages;

