import React, {useContext} from "react";
import {NominationContext} from "../../NominationContext";

const Nominations = props => {
    const {nominations, setNominations} = useContext(NominationContext);
    
    return (
        <div>
            <div>Items</div>
        </div>
    )
}

export default Nominations;