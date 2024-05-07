import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message.jsx';
import URL from '../Url.jsx';

function MessageList(props) {
    const [messages, setMessages] = useState([]);

    function refreshMessages() {
        let url;
        if (props.authorFocused)
            url = `${URL()}/message/user/${props.type ? "private" : "public"}/${props.authorFocused}`
        else 
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