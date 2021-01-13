import React, {useContext} from "react";
import {NominationContext} from "../../NominationContext";

import classes from "./Card.module.css";
import defaultPoster from "../../images/default.jpeg";

const Card = props => {
    const [nominations, setNominations] = useContext(NominationContext);

    const nominationHandler = (dataArr) => {
      if (dataArr[0] === "remove"){
        if (nominations.count <= 5 && nominations.count >= 1){
          let removeNominations = nominations;
          delete removeNominations[dataArr[1]];
          removeNominations.count -= 1;
          setNominations(removeNominations);
        } else {
          alert("You have no more nominations");
        }
      } else {
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
      }    

      let button = (<button onClick={() => props.reload(nominationHandler, [props.title, props.year, props.imdbID])}
      className={classes.Nominate}
      >Nominate</button>)

      //Check if nominated and if so disable button
      if (nominations[props.imdbID]){
        button = (
          <button className={classes.Remove} onClick={() => props.reload(nominationHandler, ["remove", props.imdbID])}>
            Remove Nomination
          </button>)
      }

      //If no poster provided
      let poster = props.poster;
      if (props.poster === "N/A") {
        poster = defaultPoster;
      }

    return (
        <div className={classes.Card}>
            <div>
                <img src={poster} alt={props.title}/>
            </div>
            <div>
                <h1>{props.title} ({props.year})</h1>
                <h3>IMDB ID: {props.imdbID}</h3>
            </div>
            {button}
        </div>
    )
}

export default Card;