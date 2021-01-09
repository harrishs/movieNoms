import React from "react";

const NominationHolder = props => {
    return (
        <div>
            <div>Number of Nominations: {props.count}</div>
            {props.children}
        </div>
    )
}

export default NominationHolder;