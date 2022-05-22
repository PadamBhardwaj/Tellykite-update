import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from '../../actions/adminaction';
import "./ForgotPassword.css"
import { toast } from "react-toastify"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const ForgotPassword = ({ history }) => {
    const dispatch = useDispatch();
    // const alert = useAlert();

    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        // const myForm = new FormData();
        // myForm.set("email", email);
        const email1 = {
            email: email
        }
        dispatch(forgotPassword(email1));
        history.push("/")
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            // dispatch(clearErrors());
        }

        if (message) {
            toast.success(message);
        }
    });
    function handleBack() {
        history.goBack()
    }
    return (
        <>
            {(
                <>
                    {/* <MetaData title="Forgot Password" /> */}
                    <div className="forgotPasswordContainer">
                        <div className='goback'>
                            <button onClick={handleBack} type='submit' className='btn btn-dark'>
                                <ArrowBackIcon />
                            </button>
                        </div>
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">Forgot Password</h2>

                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Send"
                                    className="forgotPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

