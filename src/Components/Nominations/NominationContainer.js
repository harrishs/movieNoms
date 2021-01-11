import React, {useState, useContext} from "react";

import classes from "./NominationContainer.module.css"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Backdrop from "../Backdrop/Backdrop";
import {NominationContext} from "../../NominationContext";

const NominationHolder = props => {
    const [toggle, setToggle] = useState(false);
    const [nominations, setNominations] = useContext(NominationContext);

    const toggleHandler = () => {
        setToggle(!toggle);
    }

    //Open and close side bar and adjust icon
    let toggleClasses = [classes.NominationContainer, classes.Close]
    let toggleIcon = <ChevronRightIcon onClick={toggleHandler} className={classes.icon}/>;
    if (toggle) {
        toggleClasses = [classes.NominationContainer, classes.Open]
        toggleIcon = <ChevronLeftIcon onClick={toggleHandler} className={classes.icon}/>
    }

    const clearNominations = () => {
        localStorage.removeItem("nominations");
        setNominations({count: 0});
    }

    return (
        <>
        <Backdrop clicked={()=>setToggle(false)} show={toggle}/>
        <div className={toggleClasses.join(" ")} onClick={toggleHandler}>
            {toggleIcon}
            <h1 className={classes.Count}>Number of Nominations: {props.count}/5</h1>
            <div className={classes.Nominations}>
            {props.children}
            </div>
            <div className={classes.Clear} onClick={clearNominations}>Clear All Nominations</div>
        </div>
        </>
    )
}

export default NominationHolder;