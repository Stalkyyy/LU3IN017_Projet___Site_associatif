import React, { useState, useEffect } from 'react';
import Comment from './Comment.jsx';
import URL from '../Url.jsx';
import axios from 'axios';

function CommentList(props) {
    // Contient la liste de commentaires affichées.
    const [Comments, setComments] = useState([]);



    // Gère la demande serveur pour récupérer la liste de commentaire, grâce à l'ID d'un message.
    function refreshComments() {
        axios.get(`${URL()}/comment/msg/${props.msgId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setComments([]);
            });
    };

    // Permet de faire la demande lors de la création du composant.
    useEffect(() => {
        refreshComments();
    }, []);




    return (
        <div id="CommentList">
            {Comments.map(com => (
                <Comment key={com._id} user={props.user} com={com} refresh={refreshComments} visitProfile={props.visitProfile}/>
            ))}
        </div>
    );
};

export default CommentList;