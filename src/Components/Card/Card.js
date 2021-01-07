import React from "react";

const Card = props => {
    return (
        <div key={props.imdbID}>
            <div>
                <img src={props.poster} alt={props.title}/>
            </div>
            <div>
                <h1>{props.title}</h1>
                <h3>Released: {props.year}</h3>
                <h3>IMDB Id: {props.imdbID}</h3>
            </div>
            <form>
                <button>Nominate</button>
                <button>Remove Nomination</button>
            </form>
        </div>
    )
}

export default Card;