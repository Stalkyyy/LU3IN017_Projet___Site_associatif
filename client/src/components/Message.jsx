import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import '../css/Message.css'
import axios from 'axios';
import URL from '../Url.jsx';

function Message(props) {
    const [author, setAuthor] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    function refreshMessage() {
        setRefreshKey(oldKey => oldKey + 1);
    };

    function clickDeleteHandler(e) {
        axios.delete(`${URL()}/message/id/${props.msg._id}`)
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


    function getShowComments(event) {
        setShowComments(!showComments);
    }


    useEffect(() => {
        axios.get(`${URL()}/user/${props.msg.idAuthor}`)
            .then(response => {
                setAuthor(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [props.msg.idAuthor]);

    return (
        <div className="Message">
            <header className="header-Message">
                <div className="userInfo-Message">
                    <img className="profilePic-Message" src="/images/Celestine_sans_teinture.png" alt="profilePicture" />
                    <p className="username-Message" onClick={() => {props.visitProfile(props.msg.idAuthor)}}>{author.firstname} {author.lastname}</p>
                </div>
                <h1 className="title-Message">{props.msg.title}</h1>
            </header>

            <p className="content-Message">
                {props.msg.content}
            </p>

            <footer className="footer-Message">
                <p>
                    Date : {new Date(props.msg.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                </p>
                <button id="commentListMsg" onClick={getShowComments}>Commentaires</button>
                {(props.user.status === "admin") || (props.user._id === author._id) ? <button id='deleteMsg' onClick={clickDeleteHandler}>Supprimer</button> : <></>}
            </footer>

            {!showComments ? <></> :
                <div id="conteneurComment">
                    <CommentForm user={props.user} msgId={props.msg._id} refreshMessage={refreshMessage}/>
                    <CommentList user={props.user} msgId={props.msg._id} key={refreshKey} visitProfile={props.visitProfile}/>
                </div>
            }
        </div>
    );
};

export default Message;