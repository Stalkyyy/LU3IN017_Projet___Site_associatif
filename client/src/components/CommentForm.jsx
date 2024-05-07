import { useState, useEffect } from "react";
import '../css/CommentForm.css'
import axios from 'axios';
import URL from '../Url.jsx';

function CommentForm(props) {
    const [ content, setContent ] = useState("");
    const [ error, setError ] = useState("");

    function getContent(event) {
        setContent(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.put(`${URL()}/comment/create`, { idAuthor: props.user._id, content, idMessage: props.msgId})
            .then(response => {
                setContent("");
                setError("Commentaire envoyé !");
                props.refreshMessage();
            })
            .catch(error => {
                setError("Une erreur s'est produite lors de l'envoi du Comment.");
            });
    }



    return (
        <form id="CommentForm" onSubmit={handleSubmit}>
            <label>Contenu :</label>
            <textarea value={content} onChange={getContent} required />
            <p>{error}</p>
            <button type="submit">Commenter</button>
        </form>
    )
}

export default CommentForm;