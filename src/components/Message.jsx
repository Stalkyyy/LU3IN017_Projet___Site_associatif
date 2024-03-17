import { useEffect } from "react";
import CommentList from "./CommentList";
import '../css/Message.css'

function Message(props) {
    return (
        <div className="Message">
            <header className="header-Message">
                <div className="userInfo-Message">
                    <img className="profilePic-Message" src="/images/Celestine_sans_teinture.png" alt="profilePicture" />
                    <p className="username-Message">Evelyn Celestine</p>
                </div>
                <h1 className="title-Message">Mon premier message !</h1>
            </header>

            <p className="content-Message">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
            </p>

            <footer className="footer-Message">

            </footer>
        </div>
    )
}

export default Message;