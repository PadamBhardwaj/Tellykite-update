import React from 'react'
// import Styles from "./reseller.module.css"
import { useDispatch, useSelector } from "react-redux"
import EditReseller from "../Forms/edit reseller form/edirresellerfomr";
import { useHistory } from 'react-router-dom';
import { deleteReseller, getReseller } from "../../actions/adminaction"
// import { TOTAL_REQUEST } from '../../constants/adminconstants';
import { toast } from "react-toastify"
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
    function handleDelete(e) {
        e.preventDefault();
        dispatch(deleteReseller(props.id));
        history.goBack();
        toast.success("Reseller deleted Sccesfully")
    }
    return (
        <>
            <div >
                <h5 >Name: {props.name}</h5>
                <h5 >Username: {props.username}</h5>
                <button onClick={handleClick} className='btn btn-outline-primary'>Edit</button>
                <button onClick={handleDelete} className='btn btn-danger'>Delete</button>

            </div>
        </>
    )
}

export default ResellerComponent;