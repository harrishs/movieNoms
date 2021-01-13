import React, {useContext} from "react";
import {NominationContext} from "../../NominationContext";

import classes from "./Nominations.module.css";

const Nominations = props => {
    const [nominations, setNominations] = useContext(NominationContext);

    //remove nomination
    const nominationHandler = (id) => { 
          if (nominations.count <= 5 && nominations.count >= 1){
            let removeNominations = nominations;
            delete removeNominations[id];
            removeNominations.count -= 1;
            setNominations(removeNominations);
          } else {
            alert("You have no more nominations");
          }
    }    

    return (
        <div className={classes.Nomination}>
            <h3>{props.title} ({props.year})</h3>
            <button className={classes.Remove} onClick={() => props.reload(nominationHandler, props.imdbID)}>Remove Nomination</button>
        </div>
    )
}

export default Nominations;