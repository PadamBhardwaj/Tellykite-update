import React from 'react'
import Styles from "./customer.module.css"
import { useHistory } from 'react-router-dom';
import { deleteCustomer, getTopResellers } from '../../actions/adminaction';
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';


const CustomerComponent = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();

    function handleClick() {
        history.push("/editcustomerform/" + props.id)
        // e.preventDefalut();
    }
    function handleDelete(e) {
        e.preventDefault();
        dispatch(deleteCustomer(props.id));
        dispatch(getTopResellers());
        history.goBack();
        toast.success("Customer deleted Sccesfully")
    }

    return (
        <>
            <div className={Styles.Component}>
                <h4 className={Styles.Name}>Name: {props.name}</h4>
                <h5 className={Styles.Username}>Username: {props.username}</h5>
                <button className={Styles.Edit} onClick={handleClick}>Edit</button>
                <button onClick={handleDelete} className='btn btn-danger'>Delete</button>

            </div>
        </>
    )
}

export default CustomerComponent;