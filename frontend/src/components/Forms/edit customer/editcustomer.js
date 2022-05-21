import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Styles from "./editcustomer.module.css"

import { useParams } from "react-router-dom"
import { getCustomer, updateCustomer } from "../../../actions/adminaction"
const EditCustomer = ({ history }) => {
    const dispatch = useDispatch()
    const { isAuthenticatedAdmin } = useSelector(state => state.admin);
    const { editCustomer, loading } = useSelector(state => state.editCustomer)
    const { id } = useParams();
    const idObject = {
        id: id
    }
    useEffect(() => {
        if (loading) {
            dispatch(getCustomer(idObject));
        }
        if (isAuthenticatedAdmin === false) {
            console.log("customer update form returning")
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
        // console.log(val)
        dispatch(updateCustomer(val))
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
                        <input name="username" defaultValue={editCustomer.username} onChange={handleChange} placeholder='Username' className={Styles.Input} />
                        <input onChange={handleChange} name="password" type="password" value={val.password} placeholder='Password' className={Styles.Input} />
                        <input onChange={handleChange} name="email" defaultValue={editCustomer.email} placeholder='Email' className={Styles.Input} />
                        <input onChange={handleChange} name="company" defaultValue={editCustomer.company} placeholder='Company Name' className={Styles.Input} />
                        <input onChange={handleChange} name="address" defaultValue={editCustomer.address} placeholder='Address' className={Styles.Input} />
                        <input onChange={handleChange} name="website" defaultValue={editCustomer.website} placeholder='Website' className={Styles.Input} />
                        <input onChange={handleChange} name="location" defaultValue={editCustomer.location} placeholder='Location' className={Styles.Input} />
                        <input onChange={handleChange} name="cellno" defaultValue={editCustomer.cellno} placeholder='Cell No' className={Styles.Input} />
                        <input onChange={handleChange} name="telephone" defaultValue={editCustomer.telephone} placeholder='Telephone Number' className={Styles.Input} />
                        <button type="submit" onClick={handleClick} className={Styles.Button} >Submit</button>
                    </form>
                </div>
            </>
        )
    }
}
export default EditCustomer;










// value={val.username}































// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux"
// import Styles from "./editcustomer.module.css"
// import { updateCustomer, updateReseller } from "../../../actions/adminaction"
// const EditCustomer = ({ history }) => {
//     const dispatch = useDispatch()
//     const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
//     useEffect(() => {

//         if (isAuthenticatedAdmin === false) {
//             console.log("customer update form returning")
//             history.push("/");
//         }
//     }, [isAuthenticatedAdmin]);

//     let initialValue = {
//         username: "",
//         password: "",
//         email: "",
//         company: "",
//         address: "",
//         website: "",
//         location: "",
//         cell_No: "",
//         telephoneNumber: "",

//     }
//     const [val, setVal] = useState(initialValue)


//     const handleChange = (e) => {
//         setVal({ ...val, [e.target.name]: e.target.value })
//     }
//     function handleClick(e) {
//         e.preventDefault();
//         dispatch(updateCustomer(val));
//         // alert.success("Reseller Created")
//         history.push("/admin");

//     }


//     return (
//         <>
//             <div className={Styles.Container}>
//                 <form className={Styles.Form}>
//                     <input onChange={handleChange} name="username" value={val.username} placeholder='Username' className={Styles.Input} />
//                     <input onChange={handleChange} name="password" type="password" value={val.password} placeholder='Password' className={Styles.Input} />
//                     <input onChange={handleChange} name="email" value={val.email} placeholder='Email' className={Styles.Input} />
//                     <input onChange={handleChange} name="company" value={val.company} placeholder='Company Name' className={Styles.Input} />
//                     <input onChange={handleChange} name="address" value={val.address} placeholder='Address' className={Styles.Input} />
//                     <input onChange={handleChange} name="website" value={val.website} placeholder='Website' className={Styles.Input} />
//                     <input onChange={handleChange} name="location" value={val.location} placeholder='Location' className={Styles.Input} />
//                     <input onChange={handleChange} name="cellno" value={val.cellno} placeholder='Cell No' className={Styles.Input} />
//                     <input onChange={handleChange} name="telephone" value={val.telephone} placeholder='Telephone Number' className={Styles.Input} />
//                     <button type="submit" onClick={handleClick} className={Styles.Button} >Submit</button>
//                 </form>
//             </div>
//         </>
//     )
// }


// export default EditCustomer;