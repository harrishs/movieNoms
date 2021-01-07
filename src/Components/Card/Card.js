import React from "react";

const Card = props => {
    return (
        <div>
            {/* <div>
                <img src={props.poster} alt={props.title}/>
            </div> */}
            <div>
                <h1>{props.title} ({props.year})</h1>
                <h3>IMDB Id: {props.imdbID}</h3>
            </div>
            <form>
                <button onClick={() => props.addNomination(props.title, props.imdbID)}>Nominate</button>
                <button>Remove Nomination</button>
            </form>
        </div>
    )
}

export default Card;