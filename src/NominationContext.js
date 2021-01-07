import React from "react";

export const NominationContext = React.createContext();

export const NominationProvider = props => {
    return (
        <NominationContext.Provider>
            {props.children}
        </NominationContext.Provider>
    )
}