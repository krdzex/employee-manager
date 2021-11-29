import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { createTeam } from '../ApiService/teamApi';

const AddTeam = () => {
    const [errors, setErrors] = useState({})

    const [firstTime, setFirstTime] = useState(true)
    const [values, setValues] = useState({
        teamName: "",
        shortDescription: "",
        redirect: false
    })

    const onSubmit = (e) => {
        let team = {
            teamName: values.teamName || "",
            shortDescription: values.shortDescription || ""
        }
        e.preventDefault();
        createTeam(team).then(response => {
            if (firstTime) {
                document.getElementById("gridTeam").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setValues({ ...values, redirect: true })
            } else {
                setErrors(response)
            }
        })
    }
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }


    if (values.redirect) return <Navigate to="/teams" />
    return (
        <div className="addTeamWrapper">
            <div className="header">
                Add Team
            </div>
            <form onSubmit={onSubmit}>
                <div className="grid" id="gridTeam" style={{display:"block",minWidth:"500px"}}>
                    <div className="leftSide">
                        <div className="inputBox">
                            Team Name:
                            <input type="text" className={errors.teamName ? "error" : "success"} value={values.teamName} onChange={onChange("teamName")} />
                            {errors.teamName && (<span style={{ color: "red" }}>{errors.teamName}</span>)}
                        </div>
                        <div className="inputBox">
                            Short description:
                            <textarea value={values.shortDescription} style={errors.shortDescription ? { border: "2px solid red" } : {}} onChange={onChange("shortDescription")} />
                            {errors.shortDescription && (<span style={{ color: "red" }}>{errors.shortDescription}</span>)}
                        </div>
                    </div>
                </div>
                <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <input type="submit" />
                    <Link to="/teams" style={{ textDecoration: "none" }}><div className="cancel">
                        Cancel
                    </div></Link>
                </div>
            </form>
        </div >
    );
};

export default AddTeam;