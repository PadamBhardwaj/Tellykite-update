import React, { useEffect, useState } from 'react'
import Styles from "../Reseller Profile/resellerProfile.module.css"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { loadCustomer, updatePassword } from '../../actions/customeraction';

export const CustomerProfile = ({ history }) => {
    const dispatch = useDispatch();
    const { isAuthenticatedCustomer, customer } = useSelector(state => state.customer)
    useEffect(() => {

        if (!isAuthenticatedCustomer) {
            console.log("customer profile returning")
            history.push("/customer")
        }
    })
    let initialValue = {
        newPassword: "",
        confirmPassword: ""
    }
    const [val, setVal] = useState(initialValue)
    function handleClick() {

        if (val.newPassword !== val.confirmPassword) {
            toast.error("Passwords do not match!")
        }
        else if (val.newPassword === "") {
            toast.error("Password can not be empty")
        }
        else {
            dispatch(updatePassword(val))
            dispatch(loadCustomer())
            toast.success("Password changed Succesfully")
            // history.goBack()
        }

    }
    function handleBack() {
        history.push("/customer")
    }
    function handleChange(e) {
        setVal({ ...val, [e.target.name]: e.target.value })
    }

    return (<>
        <div className={Styles.Head}>
            <button onClick={handleBack} type='submit' className='btn btn-warning'>
                Go Back
            </button>
            <h1>Customer Profile</h1></div>
        <div className={Styles.Details}>
            <h4>Name: {customer.username}</h4>
            <h4>Email: {customer.email}</h4>
            {/* <h4>Customer Count: {customer.customerCount}</h4> */}
            <h4>Website: {customer.website}</h4>
            <h4>Cell number: {customer.cell_no}</h4>
            <h4>location: {customer.location}</h4>
        </div>


        <div className={Styles.Password}>
            <h6>Change password</h6>
            <label>New Password:  </label>
            <br />
            <input name='newPassword' onChange={handleChange} type='password' value={val.newPassword} />
            <br />
            <label>Confirm New Password: </label><br />
            <input name='confirmPassword' type='password' value={val.confirmPassword} onChange={handleChange} />
            <div className={Styles.Btn}>
                <button className='btn btn-primary' type='submit' onClick={handleClick}>Change Password</button>
            </div>
        </div>
    </>
    )
}
