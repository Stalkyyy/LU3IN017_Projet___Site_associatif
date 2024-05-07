import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment.jsx';
import URL from '../Url.jsx';

function CommentList(props) {
    const [Comments, setComments] = useState([]);

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