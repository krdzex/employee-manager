import React, { useState } from 'react';
import { createUser } from '../ApiService/userApi';
import { Link, Navigate } from "react-router-dom"
const AddEmployee = () => {

    const [firstTime, setFirstTime] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userName", values.userName)
        formData.append("img", values.img)
        formData.append("role", values.role)
        formData.append("contractedSalary", values.contractedSalary)
        formData.append("firstName", values.firstName)
        formData.append("lastName", values.lastName)
        formData.append("phoneNumber", values.phoneNumber)
        formData.append("birthDate", values.birthDate)
        formData.append("employmentStartDate", values.employmentStartDate)
        formData.append("status", values.status)
        formData.append("jobTitle", values.jobTitle)
        formData.append("employmentEndDate", values.employmentEndDate)
        formData.append("email", values.email)
        formData.append("password", values.password)

        createUser(formData).then(response => {
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
        userName: "",
        img: "",
        role: "",
        contractedSalary: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
        employmentStartDate: "",
        status: "",
        jobTitle: "",
        employmentEndDate: "",
        email: "",
        password: "",
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

    const jobTitles = [
        "General Manager",
        "Project Manager",
        "QA Engineer",
        "UX Designer",
        "Junior Developer",
        "Senior Developer",
    ]

    const onChangeFile = (e) => {
        setValues({ ...values, img: e.target.files[0] })
    }

    if (values.redirect) return <Navigate to="/" />
    return (
        <div className="addEmployeeWrapper">
            <div className="header">
                Add employee
            </div>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="grid" id="grid">
                    <div className="leftSide">
                        <div className="img">
                            <img src={process.env.PUBLIC_URL + `/images/noImage.jpg`}></img>
                            {errors.img && (<span style={{ color: "red" }}>Cant be empty image!</span>)}
                        </div>
                        <input type="file" name="img" className="addFile" onChange={onChangeFile} />
                        <div className="inputBox">
                            Contracted Salary:
                            <input type="number" value={values.contractedSalary} className={errors.contractedSalary ? "error" : "success"} onChange={onChange("contractedSalary")} />
                            {errors.contractedSalary && (<span style={{ color: "red" }}>{errors.contractedSalary}</span>)}
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="rightSideLeftElement">
                            <div className="inputBox">
                                Username:
                                <input type="text" value={values.userName} className={errors.userName ? "error" : "success"} onChange={onChange("userName")} />
                                {errors.userName && (<span style={{ color: "red" }}>{errors.userName}</span>)}
                            </div>
                            <div className="inputBox">
                                Password:
                                <input type="password" value={values.password} className={errors.password ? "error" : "success"} onChange={onChange("password")} />
                                {errors.password && (<span style={{ color: "red" }}>{errors.password}</span>)}
                            </div>
                            <div className="inputBox">
                                First Name:
                                <input type="text" value={values.firstName} className={errors.firstName ? "error" : "success"} onChange={onChange("firstName")} />
                                {errors.firstName && (<span style={{ color: "red" }}>{errors.firstName}</span>)}
                            </div>
                            <div className="inputBox">
                                Last Name:
                                <input type="text" value={values.lastName} className={errors.lastName ? "error" : "success"} onChange={onChange("lastName")} />
                                {errors.lastName && (<span style={{ color: "red" }}>{errors.lastName}</span>)}
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
                            <div className="inputBox">
                                Birth Date:
                                <input type="date" value={values.birthDate} className={errors.birthDate ? "error" : "success"} onChange={onChange("birthDate")} />
                                {errors.birthDate && (<span style={{ color: "red" }}>{errors.birthDate}</span>)}
                            </div>
                        </div>
                        <div className="rightSideRightElement">
                            <div className="inputBox">
                                Employment Start Date:
                                <input type="date" value={values.employmentStartDate} className={errors.employmentStartDate ? "error" : "success"} onChange={onChange("employmentStartDate")} />
                                {errors.employmentStartDate && (<span style={{ color: "red" }}>{errors.employmentStartDate}</span>)}
                            </div>
                            <div className="inputBox">
                                Status:
                                <input type="text" list="status" className={errors.status ? "error" : "success"} value={values.status} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("status")} onBlur={() => onRelease("status")} onMouseDown={() => setValues({ ...values, status: "" })} />
                                <datalist id="status">
                                    <option value="Trial" />
                                    <option value="Active" />
                                    <option value="Leaver" />
                                </datalist>
                                {errors.status && (<span style={{ color: "red" }}>{errors.status}</span>)}
                            </div>
                            <div className="inputBox">
                                Job Title:
                                <input type="text" list="jobTitle" className={errors.jobTitle ? "error" : "success"} value={values.jobTitle} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("jobTitle")} onBlur={() => onRelease("jobTitle")} onMouseDown={() => setValues({ ...values, jobTitle: "" })} />
                                <datalist id="jobTitle">
                                    {jobTitles.map((job, id) => {
                                        return <option value={job} key={id} />
                                    })}
                                </datalist>
                                {errors.jobTitle && (<span style={{ color: "red" }}>{errors.jobTitle}</span>)}
                            </div>
                            <div className="inputBox">
                                Employment End Date:
                                <input type="date" className={errors.employmentEndDate ? "error" : "success"} value={values.employmentEndDate} onChange={onChange("employmentEndDate")} />
                                {errors.employmentEndDate && (<span style={{ color: "red" }}>{errors.employmentEndDate}</span>)}
                            </div>
                            <div className="inputBox">
                                Role:
                                <input type="text" list="role" className={errors.role ? "error" : "success"} value={values.role} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("role")} onBlur={() => onRelease("role")} onMouseDown={() => setValues({ ...values, role: "" })} />
                                <datalist id="role">
                                    <option value="Admin" />
                                    <option value="User" />
                                </datalist>
                                {errors.role && (<span style={{ color: "red" }}>{errors.role}</span>)}
                            </div>
                            <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <input type="submit" />
                                <Link to="/emyploees" style={{ textDecoration: "none" }}><div className="cancel">
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

export default AddEmployee;