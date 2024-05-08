import React, { useState, useEffect } from 'react';
import URL from '../Url.jsx';
import axios from 'axios';
import '../css/Comment.css'

function Comment(props) {
    // Garde en mémoire les informations de l'auteur du commentaire.
    const [author, setAuthor] = useState({});


    
    // Gère la demande serveur pour supprimer le commentaire.
    function clickDeleteHandler(e) {
        axios.delete(`${URL()}/comment/id/${props.com._id}`)
            .then((response) => {
                if (response.status === 200)
                    props.refresh();
                else
                    console.log(response);
            })
            .catch(err => {
                console.error(err);
            })
    }


    // Permet de faire une demande au serveur pour récupérer l'auteur du commentaire, quand le composant est crée.
    useEffect(() => {
        axios.get(`${URL()}/user/${props.com.idAuthor}`)
            .then(response => {
                setAuthor(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [props.com.idAuthor]);



    return (
        <div className="Comment">
            <div className="userInfo-Comment">
                <img className="profilePic-Comment" src="/images/Celestine_sans_teinture.png" alt="profilePicture" />
                <p className="username-Comment" onClick={() => {props.visitProfile(props.com.idAuthor)}}>{author.firstname} {author.lastname}</p>
            </div>

            <p className="content-Comment">
                {props.com.content}
            </p>

            <footer className="footer-Comment">
                <p>
                    Date : {new Date(props.com.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                </p>
                {(props.user.status === "admin") || (props.user._id === author._id) ? <button id='deletecom' onClick={clickDeleteHandler}>Supprimer</button> : <></>}
            </footer>
        </div>
    );
};

export default Comment;