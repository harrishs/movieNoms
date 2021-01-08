import React, {useState} from "react";

export const NominationContext = React.createContext();

export const NominationProvider = props => {
    const [nominations, setNominations] = useState({count: 0});

    return (
        <NominationContext.Provider value={[nominations, setNominations]}>
            {props.children}
        </NominationContext.Provider>
    )
}
