import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Styles from "./editreseller.module.css"
import { useParams } from "react-router-dom"
import { updateReseller, getReseller } from "../../../actions/adminaction"
const EditReseller = ({ history }) => {
    const dispatch = useDispatch()
    const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    const { editReseller, loading } = useSelector(state => state.editReseller)
    const { id } = useParams();
    const idObject = {
        id: id
    }
    useEffect(() => {
        if (loading) {
            dispatch(getReseller(idObject));
        }
        if (isAuthenticatedAdmin === false) {
            console.log("reseller update form returning")
            history.push("/");
        }
    }, [loading]);
    let initialValue = {
        username: "",
        email: "",
        password: "",
        company: "",
        address: "",
        website: "",
        location: "",
        cellno: "",
        telephone: "",
        id: id
    }
    function handleClick(e) {
        e.preventDefault();
        console.log(val)
        dispatch(updateReseller(val))
        history.push("/admin");
    }
    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
    }
    const [val, setVal] = useState(initialValue)
    // console.log(val == initialValue)
    if (!loading) {
        // if (val === initialValue) {
        //     setVal({ username: editReseller.username })
        //     // this.forceUpdate()

        //     // window.location.reload(false)
        // }
        return (
            <>
                <div className={Styles.Container}>
                    <form className={Styles.Form}>
                        <input name="username" defaultValue={editReseller.username} onChange={handleChange} placeholder='Username' className={Styles.Input} />
                        <input onChange={handleChange} name="password" type="password" value={val.password} placeholder='Password' className={Styles.Input} />
                        <input onChange={handleChange} name="email" defaultValue={editReseller.email} placeholder='Email' className={Styles.Input} />
                        <input onChange={handleChange} name="company" defaultValue={editReseller.company} placeholder='Company Name' className={Styles.Input} />
                        <input onChange={handleChange} name="address" defaultValue={editReseller.address} placeholder='Address' className={Styles.Input} />
                        <input onChange={handleChange} name="website" defaultValue={editReseller.website} placeholder='Website' className={Styles.Input} />
                        <input onChange={handleChange} name="location" defaultValue={editReseller.location} placeholder='Location' className={Styles.Input} />
                        <input onChange={handleChange} name="cellno" defaultValue={editReseller.cellno} placeholder='Cell No' className={Styles.Input} />
                        <input onChange={handleChange} name="telephone" defaultValue={editReseller.telephone} placeholder='Telephone Number' className={Styles.Input} />
                        <button type="submit" onClick={handleClick} className={Styles.Button} >Submit</button>
                    </form>
                </div>
            </>
        )
    }
}
export default EditReseller;










// value={val.username}



