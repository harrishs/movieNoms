import React, {useContext, useState} from "react";
import {NominationContext} from "../../NominationContext";

const Card = props => {
    const [nominations, setNominations] = useContext(NominationContext);
    const [nominated, setNominated] = useState(false);

    const nominationHandler = (title, year) => {
        setNominated(true);
        //add nomination
          if (nominations.count < 5){
            if (nominations.count === 4){
              alert("You have added your final nomination");
            }
          let addNominations = nominations;
          addNominations[title] = year;
          addNominations.count += 1;
          setNominations(addNominations);
          } else {
            alert("You have already added 5 nominations");
          }
      }    

    return (
        <div>
            {/* <div>
                <img src={props.poster} alt={props.title}/>
            </div> */}
            <div>
                <h1>{props.title} ({props.year})</h1>
                <h3>IMDB Id: {props.imdbID}</h3>
            </div>
            <button onClick={() => nominationHandler(props.title, props.year)}
            disabled={nominated}
            >Nominate</button>
        </div>
    )
}

export default Card;