import { useState } from "react";
import URL from '../Url.jsx';
import axios from 'axios';
import '../css/CommentForm.css'

function CommentForm(props) {
    // Garde en mémoire le contenu du formulaire.
    const [ content, setContent ] = useState("");
    const [ error, setError ] = useState("");

    function getContent(event) {
        setContent(event.target.value);
    }



    // Gère la demande serveur pour poster un commentaire.
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