import React, {useState} from "react";

import classes from "./NominationContainer.module.css"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const NominationHolder = props => {
    const [toggle, setToggle] = useState(false);

    const toggleHandler = () => {
        setToggle(!toggle);
    }

    let toggleClasses = [classes.NominationContainer, classes.Close]
    let toggleIcon = <ChevronRightIcon onClick={toggleHandler} className={classes.icon}/>;
    if (toggle) {
        toggleClasses = [classes.NominationContainer, classes.Open]
        toggleIcon = <ChevronLeftIcon onClick={toggleHandler} className={classes.icon}/>
    }

    return (
        <div className={toggleClasses.join(" ")}>
            {toggleIcon}
            <h1 className={classes.Count}>Number of Nominations: {props.count}</h1>
            <div className={classes.Nominations}>
            {props.children}
            </div>
        </div>
    )
}

export default NominationHolder;