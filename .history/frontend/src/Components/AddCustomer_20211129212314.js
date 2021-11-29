import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom"
import { createCustomer } from '../ApiService/customerApi';

const AddCustomer = () => {

    const [firstTime, setFirstTime] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("businessName", values.businessName)
        formData.append("img", values.img)
        formData.append("contactName", values.contactName)
        formData.append("email", values.email)
        formData.append("phoneNumber", values.phoneNumber)
        formData.append("homeAddress", values.homeAddress)
        formData.append("zipCity", values.zipCity)
        formData.append("status", values.status)

        createCustomer(formData).then(response => {
            if (firstTime) {
                document.getElementById("grid").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setValues({ ...values, redirect: true })
            } else {
                setErrors(response)
            }
        })
    }
    const [values, setValues] = useState({
        businessName: "",
        img: "",
        contactName: "",
        email: "",
        phoneNumber: "",
        homeAddress: "",
        zipCity: "",
        status: "",
        redirect: false
    })

    const [errors, setErrors] = useState({})

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onRelease = (value) => {
        if (values.value === "") {
            setValues({ ...values, [value]: "" })
        }
    }


    const onChangeFile = (e) => {
        setValues({ ...values, img: e.target.files[0] })
    }

    if (values.redirect) return <Navigate to="/" />
    return (
        <div className="addCustomerWrapper">
            <div className="header">
                Add Costumer
            </div>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="grid" id="grid">
                    <div className="leftSide">
                        <div className="img">
                            <img src={process.env.PUBLIC_URL + `/images/noImage.jpg`} alt="img"></img>
                            {errors.img && (<span style={{ color: "red" }}>Cant be empty image!</span>)}
                        </div>
                        <input type="file" name="img" className="addFile" onChange={onChangeFile} />
                    </div>
                    <div className="rightSide">
                        <div className="rightSideLeftElement">
                            <div className="inputBox">
                                Business Name:
                                <input type="text" value={values.businessName} className={errors.businessName ? "error" : "success"} onChange={onChange("businessName")} />
                                {errors.businessName && (<span style={{ color: "red" }}>{errors.businessName}</span>)}
                            </div>
                            <div className="inputBox">
                                Contact Name:
                                <input type="text" value={values.contactName} className={errors.contactName ? "error" : "success"} onChange={onChange("contactName")} />
                                {errors.contactName && (<span style={{ color: "red" }}>{errors.contactName}</span>)}
                            </div>
                            <div className="inputBox">
                                Email:
                                <input type="text" value={values.email} className={errors.email ? "error" : "success"} onChange={onChange("email")} />
                                {errors.email && (<span style={{ color: "red" }}>{errors.email}</span>)}
                            </div>
                            <div className="inputBox">
                                Phone number:
                                <input type="text" value={values.phoneNumber} className={errors.phoneNumber ? "error" : "success"} onChange={onChange("phoneNumber")} />
                                {errors.phoneNumber && (<span style={{ color: "red" }}>{errors.phoneNumber}</span>)}
                            </div>
                        </div>
                        <div className="rightSideRightElement">
                            <div className="inputBox">
                                Home Address:
                                <input type="text" value={values.homeAddress} className={errors.homeAddress ? "error" : "success"} onChange={onChange("homeAddress")} />
                                {errors.homeAddress && (<span style={{ color: "red" }}>{errors.homeAddress}</span>)}
                            </div>
                            <div className="inputBox">
                                Zip, City:
                                <input type="text" value={values.zipCity} className={errors.zipCity ? "error" : "success"} onChange={onChange("zipCity")} />
                                {errors.zipCity && (<span style={{ color: "red" }}>{errors.zipCity}</span>)}
                            </div>
                            <div className="inputBox">
                                Status:
                                <input type="text" list="status" className={errors.status ? "error" : "success"} value={values.status} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("status")} onBlur={() => onRelease("status")} onMouseDown={() => setValues({ ...values, status: "" })} />
                                <datalist id="status">
                                    <option value="Prospect" />
                                    <option value="Client" />
                                </datalist>
                                {errors.jobTitle && (<span style={{ color: "red" }}>{errors.jobTitle}</span>)}
                            </div>
                            <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <input type="submit" />
                                <Link to="/customers" style={{ textDecoration: "none" }}><div className="cancel">
                                    Cancel
                                </div></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;