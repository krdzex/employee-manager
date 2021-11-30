import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { logIn } from '../Actions';
import { signin } from '../Auth/authApi';
import authHelper from '../Auth/authHelper';

const SignIn = () => {
    const { state } = useLocation();
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        userName: "",
        password: "",
        redirect: false
    })
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const dispatch = useDispatch()
    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        let user = {
            userName: values.userName || undefined,
            password: values.password || undefined
        }
        signin(user).then(response => {
            if (firstTime) {
                document.getElementById("signForm").className += " afterFirst"
                setFirstTime(false)
            }

            if (!response.userName) {
                dispatch(logIn())
                authHelper.authenticate(response, () => {
                    setErrors({})
                    setValues({ ...values, redirect: true })
                })
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }
    if (values.redirect) return <Navigate to={state ? state.from.pathname : "/about"} />
    return (
        <div className="registrationWrapper">
            <div className="signInCard">
                <div className="form" id="signForm">
                    <h2>Login</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="inputBox">
                            <input type="text" placeholder="username" className={errors.userName ? "error" : "success"} value={values.userName} onChange={onChange("userName")} />
                            <div className="icon"><Icon icon="bx:bxs-user" /></div>
                            {errors.userName && (<span style={{ color: "red", fontSize: "15px" }}>{errors.userName}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder="password" className={errors.password ? "error" : "success"} value={values.password} onChange={onChange("password")} />
                            <div className="icon password"><Icon icon="ri:lock-password-fill" /></div>
                            {errors.password && (<span style={{ color: "red", fontSize: "15px" }}>{errors.password}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;