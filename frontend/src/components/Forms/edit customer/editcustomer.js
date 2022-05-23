import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Styles from "./editcustomer.module.css"

import { useParams } from "react-router-dom"
import Select from 'react-select'
import { getCustomer, updateCustomer } from "../../../actions/adminaction"
const EditCustomer = ({ history }) => {
    const dispatch = useDispatch()

    const { isAuthenticatedAdmin } = useSelector(state => state.admin);
    const { editCustomer, loading } = useSelector(state => state.editCustomer)
    // const TellyAccounts = useSelector(state => state.editCustomer.editCustomer.TellyAccounts.map(ele => ele))
    // const { TellyAccounts } = useSelector(state => state.editCustomer.editCustomer)

    const TellyAccount = []
    // console.log(TellyAccounts)
    // console.log(cust.TellyAccounts)

    // const idOriginal = useSelector(state => state.editCustomer.editCustomer._id)
    // console.log(idObject)
    const { resellers } = useSelector(state => state.resellers);
    const { id } = useParams();
    const [option, setOption] = useState();
    // console.log(NewTellyAccounts)
    const idObject = {
        id: id
    }
    // if (editCustomer) {
    //     const cust1 = useSelector(state => state.editCustomer.editCustomer.TellyAccounts)

    //     console.log(cust1)
    // }
    // useEffect(()=>{

    // })
    useEffect(() => {
        if (loading) {
            dispatch(getCustomer(idObject));
        }
        if (isAuthenticatedAdmin === false) {
            console.log("customer update form returning")
            history.push("/");
        }
        if (resellers) {
            let options = resellers.map((item) => {
                return { id: item._id, label: item.username }
            })
            setOption(options)
        }
        if (!loading) {
            if (id !== editCustomer._id) {
                dispatch(getCustomer(idObject));

            }
        }
    }, [loading, resellers]);
    // let initialValue = {
    //     username: editCustomer,
    //     email: "",
    //     password: "",
    //     company: "",
    //     address: "",
    //     website: "",
    //     location: "",
    //     cellno: null,
    //     telephone: null,
    //     reseller_id: "",
    //     mode: "direct",
    //     id: id
    // }
    let initialValue = editCustomer;
    // console.log(initialValue);
    // const TellyAccount = initialValue.TellyAccounts;
    // console.log(TellyAccount)

    const [NewTellyAccounts, setNewTellyAccounts] = useState([]);
    useEffect(() => {
        if (editCustomer) {
            setNewTellyAccounts(editCustomer.TellyAccounts)
        }

    }, [editCustomer])

    function handleClick() {
        // e.preventDefault();
        // console.log(val)
        // if (val.email === "") {
        //     setVal({ ...val, email: editCustomer.email })
        //     // console.log("email same")
        // }
        // if (val.username === "") {
        //     setVal({ ...val, username: editCustomer.username })
        // }
        // if (val.password === "") {
        //     setVal({ ...val, password: editCustomer.password })
        // }
        console.log(val)
        dispatch(updateCustomer(val))
        // dispatch(getCustomer(idObject))
        history.push("/admin");
    }
    const [val, setVal] = useState({ ...initialValue, password: "", id: id })
    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
    }
    // function handleBack() {
    //     dispatch(getCustomer(idObject));
    //     history.goBack();
    // }
    // console.log(val == initialValue)

    const resellerSelectHandler = (value) => {
        // console.log(value)
        setVal({ ...val, reseller_id: value.id, mode: "reseller" })
    }
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            // border: "2px solid red"
            backgroundColor: "white",
            padding: "20px",
            color: "#6B8FEA"
        }),

        container: (provided, state) => ({
            ...provided,
            // border:"2px solid green",
            width: "70%",
            margin: "20px auto",
            color: "black"
        }),

        input: (provided, state) => ({
            ...provided,
            // color: "#6B8FEA"
            color: "white"
        })


    }

    let addFormFields = (e) => {
        e.preventDefault()
        if (NewTellyAccounts) {
            setNewTellyAccounts([...NewTellyAccounts, { tellyUsername: "", tellyPassword: "", tellySerial: "" }])
        }
        else {
            setNewTellyAccounts([{ tellyUsername: "", tellyPassword: "", tellySerial: "" }])

        }
    }



    const handleTallyChange = (e, i) => {
        let newFormValues = [...NewTellyAccounts];
        newFormValues[i][e.target.name] = e.target.value;
        setNewTellyAccounts(newFormValues);

        setVal({ ...val, TellyAccounts: NewTellyAccounts })
        // console.log(val)
    };
    // console.log(editCustomer)
    // { editCustomer && console.log(editCustomer.TellyAccounts) }
    if (!loading) {
        // if (val === initialValue) {
        //     setVal({ username: editReseller.username })
        //     // this.forceUpdate()

        //     // window.location.reload(false)
        // }
        return (
            <>
                {/* <div>
                    <button className='btn btn-dark' onClick={handleBack}>Back</button>
                </div> */}
                <div className={Styles.Container}>
                    <form className={Styles.Form}>
                        <input name="username" defaultValue={editCustomer.username} onChange={handleChange} placeholder='Username' className={Styles.Input} />
                        <input onChange={handleChange} name="password" type="password" value={val.password} placeholder='Password' className={Styles.Input} />
                        <input onChange={handleChange} name="email" defaultValue={editCustomer.email} placeholder='Email' className={Styles.Input} />
                        <input onChange={handleChange} name="company" defaultValue={editCustomer.company} placeholder='Company Name' className={Styles.Input} />
                        <input onChange={handleChange} name="address" defaultValue={editCustomer.address} placeholder='Address' className={Styles.Input} />
                        <input onChange={handleChange} name="website" defaultValue={editCustomer.website} placeholder='Website' className={Styles.Input} />
                        <input onChange={handleChange} name="location" defaultValue={editCustomer.location} placeholder='Location' className={Styles.Input} />
                        <input onChange={handleChange} name="cell_No" defaultValue={editCustomer.cell_No} placeholder='Cell No' className={Styles.Input} type='number' />
                        <input onChange={handleChange} name="telephoneNumber" defaultValue={editCustomer.telephoneNumber} placeholder='Telephone Number' className={Styles.Input} type='number' />
                        <Select styles={customStyles} options={option} onChange={resellerSelectHandler} />
                        {NewTellyAccounts &&
                            NewTellyAccounts.map((element, index) => (
                                <div className={Styles.TellyAccountInput}>
                                    <input placeholder='Telly Account Username' className={Styles.Input} name='tellyUsername' value={element.tellyUsername || ''} onChange={(e) => { handleTallyChange(e, index) }} />
                                    <input placeholder='Telly Account Password' className={Styles.Input} name='tellyPassword' value={element.tellyPassword || ''} onChange={(e) => { handleTallyChange(e, index) }} />
                                    <input placeholder='Telly Account Serial Number' className={Styles.Input} name='tellySerial' value={element.tellySerial || ''} onChange={(e) => { handleTallyChange(e, index) }} />
                                </div>
                            ))
                        }
                        <button onClick={handleClick} className={Styles.Button} >Submit</button>
                        <button className={Styles.Add} onClick={(e) => { addFormFields(e) }}>Add</button>

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