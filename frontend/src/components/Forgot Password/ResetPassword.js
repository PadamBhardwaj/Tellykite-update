import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
// import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, resetPassword } from "../../actions/userAction";

// import { useAlert } from "react-alert";
// import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify"
import { loadAdmin, resetPassword } from "../../actions/adminaction";
import { loadCustomer } from "../../actions/customeraction"
import { loadReseller } from "../../actions/reselleraction"
// import { total } from "../../../../Backend/controllers/adminController";
const ResetPassword = ({ history, match }) => {
    const dispatch = useDispatch();
    // const alert = useAlert();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        // const myForm = new FormData();

        // myForm.set("password", password);
        // myForm.set("confirmPassword", confirmPassword);
        const passwordObj = {
            password: password,
            confirmPassword: confirmPassword
        }
        dispatch(resetPassword(match.params.token, passwordObj));
        dispatch(loadAdmin());
        dispatch(loadReseller());
        dispatch(loadCustomer());

        history.push("/")
    };

    useEffect(() => {
        if (error) {

            toast.error(error);
            // dispatch(clearErrors());
        }

        if (success) {
            toast.success("Password Updated Successfully");

            // history.push("/");
        }
    });

    return (
        <>
            (
            <>
                {/* <MetaData title="Change Password" /> */}
                {/* <h1></h1> */}
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2 className="resetPasswordHeading">Update Profile</h2>

                        <form
                            className="resetPasswordForm"
                            onSubmit={resetPasswordSubmit}
                        >
                            <div>
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Update"
                                className="resetPasswordBtn"
                            />
                        </form>
                    </div>
                </div>
            </>
            )
        </>
    );
};

export default ResetPassword;