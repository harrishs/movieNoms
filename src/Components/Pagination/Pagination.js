import React, {useState} from "react";
import classes from "./Pagination.module.css"

const Pagination = props => {
    const [num, setNum] = useState(props.currentPg);

    return (
        <div className={classes.Pagination}>
            <form onSubmit={(event) => {
                event.preventDefault();
                props.pgChange(num)
            }}>
                <input type="number" placeholder={props.currentPg} step="1" min="1" max={props.maxPg} onChange={e => {
                    setNum(e.target.value.replace(/\D/,''));
                }}/>
            </form>
            of {props.maxPg} Pages
        </div>
    )
}

export default Pagination;