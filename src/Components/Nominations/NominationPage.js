import React from "react";
import { useParams, Link } from 'react-router-dom';

const NominationPage = () => {
    const params = useParams();

    return (
        <div>
            <h1>{params.name} has nominated these 5 movies</h1>
            <div>{params.nom1}</div>
            <div>{params.nom2}</div>
            <div>{params.nom3}</div>
            <div>{params.nom4}</div>
            <div>{params.nom5}</div>
            <Link to="/"><button>Create Your Own List of Nominations</button></Link>
        </div>
    )
}

export default NominationPage;