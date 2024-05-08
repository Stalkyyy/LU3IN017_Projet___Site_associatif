const { ObjectId } = require('mongodb');

class Messages {
    constructor(db) {
        this.db = db
    }

    async create(idAuthor, title, content, forum) {
        // Permet de créer un nouveau message.
        
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
        // Permet de récupérer un message grâce à son ID.

        try {
            const message = await this.db.collection('messages').findOne({ _id: new ObjectId(idAuthor) });
            return message;
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }



    async getList(query = {}) {
        // Permet de récupérer une liste de messages, grâce aux options données en paramètre.

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



    async search(keywords, title, start, end, authorFirstname, authorLastname, forumType) {
        // Permet de récupérer une liste de messages, suivant les différentes précisions en paramètres.        

        try {
            let matchObj = {forum: forumType};
            if (keywords) matchObj.content = { $regex: keywords, $options: 'i' };
            if (title) matchObj.title = { $regex: title, $options: 'i' };
            if (start || end){
                matchObj.date = {} 
                if (start) matchObj.date.$gte = start;
                if (end) matchObj.date.$lte = end;
            } 

            const listMessages = await this.db.collection('messages')
                .find(matchObj)
                .sort({ date : -1 })
                .toArray();

            let filteredMessages = [];
            for (let msg of listMessages) {
                const user = await this.db.collection('users').findOne({ _id: new ObjectId(msg.idAuthor) });
                if (user && (!authorFirstname || user.firstname === authorFirstname) && (!authorLastname || user.lastname === authorLastname))
                    filteredMessages.push(msg);
            }

            return filteredMessages;
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }



    async delete(message_id) {
        // Permet de supprimer un message et la totalité de ses commentaires grâce à son ID.

        try {
            const resultMsg = await this.db.collection('messages').deleteOne({ _id: new ObjectId(message_id) });
            const resultCom = await this.db.collection('comments').deleteMany({ idMessage: message_id});
            return resultMsg.acknowledged && resultCom.acknowledged;
        } catch (err) {
            console.log('Error occurred:', err);
            throw err;
        }
    }
}

module.exports = Messages;

