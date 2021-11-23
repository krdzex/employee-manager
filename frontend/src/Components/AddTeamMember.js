import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeTeamMemberPopUp } from '../Actions';
import { addTeamMember } from '../ApiService/teamApi';
import { listUsers } from '../ApiService/userApi';

const AddTeamMember = ({ id, teamName }) => {
    const [firstTime, setFirstTime] = useState(true)

    const dispatch = useDispatch()
    const [allEmployees, setAllEmployees] = useState([])

    useEffect(() => {
        listUsers().then(res => setAllEmployees(res)).catch(err => console.log(err))
    }, [])

    const [values, setValues] = useState({
        role: "",
        employee: "",
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
    const onSubmit = (e) => {
        let employeeId;
        for (let i = 0; i < allEmployees.length; i++) {
            if (allEmployees[i].userName === values.employee) {
                employeeId = allEmployees[i]._id
            }
        }
        e.preventDefault()
        let employee = {
            _id: employeeId || undefined,
            role: values.role || undefined
        }
        addTeamMember(id, employee).then(
            response => {
                if (firstTime) {
                    document.getElementById("innerDiv").className += " afterFirst"
                    setFirstTime(false)
                }
                if (response.message) {
                    dispatch(closeTeamMemberPopUp())
                } else {
                    setErrors(response)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="addTeamMemberWrapper">
            <div className="innerDiv" id="innerDiv">
                <form onSubmit={onSubmit}>
                    <div className="title">
                        <h2>Adding team member to team: <span style={{ textDecoration: "underline", fontWeight: "500" }}>{teamName}</span></h2>
                    </div>
                    <div>
                        <div className="inputBox">
                            Employee:
                            <input type="text" list="employee" className={errors.id ? "error" : "success"} value={values.employee} onKeyDown={(event) => {
                                event.preventDefault();
                            }} onChange={onChange("employee")} onBlur={() => onRelease("employee")} onMouseDown={() => setValues({ ...values, employee: "" })} />
                            <datalist id="employee">
                                {allEmployees.map((employee, id) => {
                                    return <option value={employee.userName} key={id} />
                                })}
                            </datalist>
                            {errors.id && (<span style={{ color: "red" }}>{errors.id}</span>)}
                        </div>
                        <div className="inputBox">
                            Role in Team:
                            <input type="text" list="role" className={errors.role ? "error" : "success"} value={values.role} onKeyDown={(event) => {
                                event.preventDefault();
                            }} onChange={onChange("role")} onBlur={() => onRelease("role")} onMouseDown={() => setValues({ ...values, role: "" })} />
                            <datalist id="role">
                                <option value="Team Lead" />
                                <option value="Project Manager" />
                                <option value="Developer" />
                                <option value="QA Engineer" />
                                <option value="UX designer" />
                            </datalist>
                            {errors.role && (<span style={{ color: "red" }}>{errors.role}</span>)}
                        </div>
                        <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <input type="submit" />
                            <div className="cancel" onClick={() => dispatch(closeTeamMemberPopUp())}>
                                Cancel
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeamMember;