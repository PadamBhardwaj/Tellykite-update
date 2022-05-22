import React from 'react'
// import Styles from "./reseller.module.css"
import { useDispatch, useSelector } from "react-redux"
import EditReseller from "../Forms/edit reseller form/edirresellerfomr";
import { useHistory } from 'react-router-dom';
import { getReseller } from "../../actions/adminaction"
// import req from 'express/lib/request';
const ResellerComponent = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();

    function handleClick() {
        // e.preventDefalut();
        // console.log(props.id)
        // const id = {
        //     id: props.id
        // }
        // setTimeout(history.push("/editresellerform"), 5000)
        // dispatch(getReseller(id));
        // console.log(req)
        // console.log(props.index)
        history.push("/editresellerform/" + props.id)

    }
    return (
        <>
            <div >
                <h5 >Name: {props.name}</h5>
                <h5 >Username: {props.username}</h5>
                <button onClick={handleClick}>Edit</button>
            </div>
        </>
    )
}

export default ResellerComponent;