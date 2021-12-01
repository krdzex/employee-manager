import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { teamInfo, updateTeam } from '../ApiService/teamApi';

const EditTeam = () => {

    const { id } = useParams();

    const [errors, setErrors] = useState({})
    const [firstTime, setFirstTime] = useState(true)

    useEffect(() => {
        teamInfo(id).then(res => {
            setValues(res)
        }).catch(err => console.log(err))
    }, [id])



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
        updateTeam(id, team).then(response => {
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
                Update Team
            </div>
            <form onSubmit={onSubmit}>
                <div className="grid" id="gridTeam" style={{ display: "block" }}>
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
                    <input type="submit" value="Edit"/>
                    <Link to="/teams" style={{ textDecoration: "none" }}><div className="cancel">
                        Cancel
                    </div></Link>
                </div>
            </form>
        </div >
    );
};

export default EditTeam;