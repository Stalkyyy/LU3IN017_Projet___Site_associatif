import { useState, useEffect } from 'react';
import Message from './Message.jsx';
import URL from '../Url.jsx';
import axios from 'axios';

function MessageList(props) {
    // Garde en mémoire la liste de messages affichés.
    const [messages, setMessages] = useState([]);



    // Gère la demande serveur pour récupérer la liste de messages.
    // Nous avons une demande post pour faire une recherche détaillée,
    // Et deux demandes get pour, soit le forum, soit le profil.
    function refreshMessages() {
        let url;

        // Messages d'une recherche
        if (props.search) { 
            if (Object.keys(props.search).length === 0) return; // Recherche vide équivaut à une liste vide.

            url = `${URL()}/message/search/`;;
            return axios.post(url, props.search)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    setMessages([]);
                });
        }


        if (props.authorFocused) // Messages du profil d'un utilisateur
            url = `${URL()}/message/user/${props.type ? "private" : "public"}/${props.authorFocused}`

        else // Message d'un forum
            url = `${URL()}/message/forum/${props.type ? "private" : "public"}`

        axios.get(url)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setMessages([]);
            });
    };

    // Permet de faire une demande au serveur lors de la création du composant.
    useEffect(() => {
        refreshMessages();
    }, [props.type]);



    return (
        <div id="MessageList">
            {messages.map(msg => (
                <Message key={msg._id} user={props.user} msg={msg} refresh={refreshMessages} visitProfile={props.visitProfile}/>
            ))}
        </div>
    );
};

export default MessageList;