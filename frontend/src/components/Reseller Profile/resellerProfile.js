import React, { useEffect, useState } from 'react'
import Styles from "./resellerProfile.module.css"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { loadReseller, updatePassword } from '../../actions/reselleraction';

export const ResellerProfile = ({ history }) => {
    const dispatch = useDispatch();
    const { isAuthenticatedReseller, reseller } = useSelector(state => state.reseller)
    useEffect(() => {

        if (!isAuthenticatedReseller) {
            console.log("reseller profile returning")
            history.push("/reseller")
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
            dispatch(loadReseller())
            toast.success("Password changed Succesfully")
            // history.goBack()
        }

    }
    function handleBack() {
        history.push("/reseller")
    }
    function handleChange(e) {
        setVal({ ...val, [e.target.name]: e.target.value })
    }

    return (<>
        <div className={Styles.Head}>
            <button onClick={handleBack} type='submit' className='btn btn-warning'>
                Go Back
            </button>
            <h1>Reseller Profile</h1></div>
        <div className={Styles.Details}>
            <h4>Name: {reseller.username}</h4>
            <h4>Email: {reseller.email}</h4>
            <h4>Customer Count: {reseller.customerCount}</h4>
            <h4>Website: {reseller.website}</h4>
            <h4>Cell number: {reseller.cell_No}</h4>
            <h4>location: {reseller.location}</h4>
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
