import React, {useContext} from "react";
import {NominationContext} from "../../NominationContext";

const Nominations = props => {
    const [nominations, setNominations] = useContext(NominationContext);

    const nominationCount = nominations.count;
    const nominationArray = Object.entries(nominations);
    //remove nomination
    const nominationHandler = (title) => { 
          if (nominations.count <= 5){
            if (nominations.count <= 0){
              alert("You have no nominations");
            }
            let removeNominations = nominations;
            delete removeNominations[title];
            removeNominations.count -= 1;
            setNominations(removeNominations);
          } else {
            alert("You have no more nominations");
          }
    }    

    let renderNominations = nominationArray.map(nomination => {
        if (nomination[0] !== "count"){
            return (<div key={nomination[0]}>
                {/* nomination[0] == title, nomination[1] == year */}
                <h1>{nomination[0]} ({nomination[1]})</h1>
                <button onClick={nominationHandler(nomination[0])}>Remove Nomination</button>
            </div>)
        } else {
            return null
        }
    })

    return (
        <div>
            <div key="count">Number of Nominations: {nominationCount}</div>
            {renderNominations}
        </div>
    )
}

export default Nominations;