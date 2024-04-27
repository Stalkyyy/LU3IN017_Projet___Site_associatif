import { useState } from "react";
import Message from "./Message"

function MessageList(props) {
    return (
        <div className="MessageList">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}

export default MessageList;