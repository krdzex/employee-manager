import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from "react-router-dom"
import { customerInfo, updateCustomer } from '../ApiService/customerApi';
const EditCustomer = () => {

    const [firstTime, setFirstTime] = useState(true)
    const { id } = useParams();
    const [statusOriginal, setStatusOriginal] = useState("")
    const [originalImg, setOriginalImg] = useState("")
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        customerInfo(id).then(res => {
            setStatusOriginal(res.status)
            setOriginalImg(res.img)
            setValues(res)
        }).catch(err => console.log(err))
    }, [id])

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

        updateCustomer(id, formData).then(response => {
            if (firstTime) {
                document.getElementById("grid").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setRedirect(true)
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

    const onRelease = () => {
        if (values.status === "") {
            setValues({ ...values, status: statusOriginal })
        }
    }

    const onChangeFile = (e) => {
        setValues({ ...values, img: e.target.files[0] })
    }

    if (redirect) return <Navigate to="/customers" />
    return (
        <div className="addEmployeeWrapper">
            <div className="header">
                Edit Customer
            </div>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="grid" id="grid">
                    <div className="leftSide">
                        <div className="img">
                            <img src={process.env.PUBLIC_URL + `/images/${originalImg}`} alt="img"></img>
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
                                {errors.status && (<span style={{ color: "red" }}>{errors.status}</span>)}
                            </div>
                            <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <input type="submit" value="Update"/>
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

export default EditCustomer;
