const { ObjectId } = require('mongodb');

class Comments {
    constructor(db) {
        this.db = db
    }

    async create(idAuthor, idMessage, content) {
        try {
            const comment = {
                idAuthor,
                idMessage,
                content, 
                date: new Date(),
            };
    
            console.log('Inserting comment:', comment);
            const result = await this.db.collection('comments').insertOne(comment);
            console.log('Insert comment:', comment);
    
            if (result.acknowledged)
                return { _id: result.insertedId, ...comment }; // Retourne le document inséré
             else 
                throw new Error('Failed to insert comment into database');
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }

    async getList(idMessage) {
        try {
            const cursorListMessages = await this.db.collection('comments')
                .find({ idMessage })
                .sort({ date : -1 });
            return cursorListMessages.toArray();
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }

    async delete(comment_id) {
        try {
            const result = await this.db.collection('comments').deleteOne({ _id: new ObjectId(comment_id) });
            return result.acknowledged;
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }
}

module.exports = Comments;

