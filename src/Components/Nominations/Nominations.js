import React, {useContext} from "react";
import NominationContext from "../../NominationContext";

const Nominations = props => {
    const [nominations, setNominations] = useContext(NominationContext);

    const nominationCount = nominations.count;
    const nominationArray = Object.entries(nominations);

    let renderNominations = nominationArray.map(nomination => {
        if (nomination[0] !== "count"){
            return (<div key={nomination[0]}>
                <h1>{nomination[0]} ({nomination[1]})</h1>
                <button onClick={(event) => {
                    event.preventDefault();
                    props.Nomination(props.title, props.year, "remove");
                }
            }>Remove Nomination</button>
            </div>)
        } else {
            return (<div key="count">Number of Nominations: {nominationCount}</div>);
        }
    })

    return (
        <div>
            {renderNominations}
        </div>
    )
}

export default Nominations;