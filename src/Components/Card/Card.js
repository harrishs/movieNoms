import React, {useContext, useState} from "react";
import {NominationContext} from "../../NominationContext";

import classes from "./Card.module.css";

const Card = props => {
    const [nominations, setNominations] = useContext(NominationContext);
    const [nominated, setNominated] = useState(false);

    const nominationHandler = (dataArr) => {
        //add nomination
          if (nominations.count < 5){
            if (nominations.count === 4){
              alert("You have added your final nomination");
            }
          let addNominations = nominations;
          addNominations[dataArr[2]] = [dataArr[0], dataArr[1]];
          addNominations.count += 1;
          setNominations(addNominations);
          } else {
            alert("You have already added 5 nominations");
          }
      }    

      //Check if nominated and if so disable button
      if (nominations[props.imdbID]){
        if (!nominated){
          setNominated(true);
        }
      }

      //Check if not nominated and if so do not disable button
      if (!nominations[props.imdbID]){
        if (nominated) {
          setNominated(false);
        }
      }

    return (
        <div className={classes.Card}>
            <div>
                <img src={props.poster} alt={props.title}/>
            </div>
            <div>
                <h1>{props.title} ({props.year})</h1>
                <h3>IMDB ID: {props.imdbID}</h3>
            </div>
            <button onClick={() => props.reload(nominationHandler, [props.title, props.year, props.imdbID])}
            disabled={nominated}
            >Nominate</button>
        </div>
    )
}

export default Card;