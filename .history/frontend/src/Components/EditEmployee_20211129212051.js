import React, { useEffect, useState } from 'react';
import { updateUser, userInfo } from '../ApiService/userApi';
import { Link, Navigate, useParams } from "react-router-dom"
import moment from "moment"
const EditEmployee = () => {

    const [firstTime, setFirstTime] = useState(true)
    const { id } = useParams();
    const [jobTitleOriginal, setJobTitleOriginal] = useState("")
    const [originalImg, setOriginalImg] = useState("")
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        userInfo(id).then(res => {
            res.birthDate = moment(res.birthDate).format('YYYY-MM-DD')
            res.employmentStartDate = moment(res.employmentStartDate).format('YYYY-MM-DD')
            res.employmentEndDate = moment(res.employmentEndDate).format('YYYY-MM-DD')
            setJobTitleOriginal(res.jobTitle)
            setOriginalImg(res.img)
            setValues(res)
        }).catch(err => console.log(err))
    }, [id])

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", values.img)
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

        updateUser(id, formData).then(response => {
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
        redirect: false
    })
    const [errors, setErrors] = useState({})

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onRelease = () => {
        if (values.jobTitle === "") {
            setValues({ ...values, jobTitle: jobTitleOriginal })
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

    if (redirect) return <Navigate to="/emyploees" />
    return (
        <div className="addEmployeeWrapper">
            <div className="header">
                Edit employee
            </div>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="grid" id="grid">
                    <div className="leftSide">
                        <div className="img">
                            <img src={process.env.PUBLIC_URL + `/images/${originalImg}`} alt="img"></img>
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
                                <input type="text" value={values.status} className={errors.status ? "error" : "success"} onChange={onChange("status")} />
                                {errors.status && (<span style={{ color: "red" }}>{errors.status}</span>)}
                            </div>
                            <div className="inputBox">
                                Job Title:
                                <input type="text" list="jobTitle" className={errors.jobTitle ? "error" : "success"} value={values.jobTitle} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("jobTitle")} onBlur={() => onRelease()} onMouseDown={() => setValues({ ...values, jobTitle: "" })} />
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

export default EditEmployee;