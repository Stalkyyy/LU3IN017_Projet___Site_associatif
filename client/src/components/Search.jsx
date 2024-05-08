import { useState } from "react";
import MessageList from "./MessageList";
import '../css/SearchForm.css';
import '../css/FeedType.css';

function Search(props) {
    // Garde en mémoire les différentes options de recherches données par l'utilisateur.
    const [title, setTitle] = useState('');
    const [keywords, setKeywords] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [authorFirstname, setAuthorFirstname] = useState('');
    const [authorLastname, setAuthorLastname] = useState('');
    const [searchAttributes, setSearchAttributes] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);

    function getTitle(event) {
        setTitle(event.target.value);
    }

    function getKeywords(event) {
        setKeywords(event.target.value);
    }

    function getStartDate(event) {
        setStartDate(event.target.value);
    }

    function getEndDate(event) {
        setEndDate(event.target.value);
    }

    function getAuthorFirstname(event) {
        setAuthorFirstname(event.target.value);
    }

    function getAuthorLastname(event) {
        setAuthorLastname(event.target.value);
    }



    // Permet de donner au composant MessageList les différentes options.
    function handleSubmit(e) {
        e.preventDefault();
        setSearchAttributes({
            keywords,
            title,
            startDate,
            endDate,
            authorFirstname,
            authorLastname,
            isAdmin : (props.user.status === "admin")
        });
        setRefreshKey(oldKey => oldKey + 1);
    };


    
    return (
        <div id="Recherche" className="CentralBanner">
            <div id="conteneurMessageSearch">
                <form id="SearchForm" onSubmit={handleSubmit}>
                    <label htmlFor="title">Mots clé du titre:</label>
                    <input id="title" type="text" onChange={getTitle} />

                    <label htmlFor="keywords">Mots clé du contenu:</label>
                    <input id="keywords" type="text" onChange={getKeywords} />

                    <label htmlFor="startDate">Date de début:</label>
                    <input id="startDate" type="date" onChange={getStartDate} />

                    <label htmlFor="endDate">Date de fin:</label>
                    <input id="endDate" type="date" onChange={getEndDate} />

                    <label htmlFor="authorFirstname">Prénom d'auteur:</label>
                    <input id="authorFirstname" type="text" onChange={getAuthorFirstname} />

                    <label htmlFor="authorLastname">Nom d'auteur:</label>
                    <input id="authorLastname" type="text" onChange={getAuthorLastname} />

                    <button type="submit">Rechercher</button>
                </form>

                <MessageList key={refreshKey} search={searchAttributes} user={props.user} visitProfile={props.visitProfile}/>
            </div>
        </div>
    )
}

export default Search;