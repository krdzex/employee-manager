import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from "react-router-dom"
import { customerInfo, listCustomers } from '../ApiService/customerApi';
import { createProject, projectInfo, updateProject } from '../ApiService/projectApi';
import { listTeams, teamInfo } from '../ApiService/teamApi';
import moment from 'moment';
const EditProject = () => {

    const { id } = useParams();
    const [firstTime, setFirstTime] = useState(true)
    const [clients, setClients] = useState([])
    const [teams, setTeams] = useState([])
    const [originalTeam, setOriginalTeam] = useState("")
    const [originalClient, setOriginalClient] = useState("")
    const [originalStatus, setOriginalStatus] = useState("")
    const [originalPricing, setOriginalPricing] = useState("")
    useEffect(async () => {
        (async function(){
            listCustomers().then(res => setClients(res)).catch(err => console.log(err))
            listTeams().then(res => setTeams(res)).catch(err => console.log(err))
            const projectInformations = await projectInfo(id);
            projectInformations.startDate = moment(projectInformations.startDate).format('YYYY-MM-DD')
            projectInformations.endDate = moment(projectInformations.endDate).format('YYYY-MM-DD')
            let customerInformations = await customerInfo(projectInformations.client)
            let teamInformation = await teamInfo(projectInformations.team);
            setOriginalClient(customerInformations.businessName)
            setOriginalTeam(teamInformation.teamName)
            projectInformations.team = teamInformation.teamName;
            projectInformations.client = customerInformations.businessName;
            setOriginalStatus(projectInformations.status)
            setOriginalPricing(projectInformations.pricing)
            setValues(projectInformations)
        }())
    }, [])

    const onSubmit = (e) => {
        let clientId;
        let teamId;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].businessName === values.client) {
                clientId = clients[i]._id
            }
        }
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].teamName === values.team) {
                teamId = teams[i]._id
            }
        }
        e.preventDefault();
        let project = {
            projectName: values.projectName || "",
            description: values.description || "",
            startDate: values.startDate || undefined,
            endDate: values.endDate || undefined,
            status: values.status || undefined,
            client: clientId || undefined,
            team: teamId || undefined,
            pricing: values.pricing || undefined
        }
        updateProject(id, project).then(response => {
            if (firstTime) {
                document.getElementById("gridProject").className += " afterFirst"
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
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
        client: "",
        team: "",
        pricing: "",
        redirect: false
    })

    const [errors, setErrors] = useState({})

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onRelease = (value) => {
        switch (value) {
            case "status": {
                if (values.status === "") {
                    setValues({ ...values, status: originalStatus })
                }
                break;
            }
            case "client": {
                if (values.client === "") {
                    setValues({ ...values, client: originalClient })
                }
                break;
            }
            case "team": {
                if (values.team === "") {
                    setValues({ ...values, team: originalTeam })
                }
                break;
            }
            case "pricing": {
                if (values.pricing === "") {
                    setValues({ ...values, pricing: originalPricing })
                }
                break;
            }
            default: {
                return value;
            }
        }
    }

    if (values.redirect) return <Navigate to="/projects" />
    return (
        <div className="addProjectWrapper">
            <div className="header">
                Edit Project
            </div>
            <form onSubmit={onSubmit}>
                <div className="grid" id="gridProject">
                    <div className="leftSide">
                        <div className="inputBox">
                            Project Name:
                            <input type="text" value={values.projectName} className={errors.projectName ? "error" : "success"} onChange={onChange("projectName")} />
                            {errors.projectName && (<span style={{ color: "red" }}>{errors.projectName}</span>)}
                        </div>
                        <div className="inputBox">
                            Description:
                            <textarea type="text" value={values.description} style={errors.description ? { border: "2px solid red" } : {}} onChange={onChange("description")} />
                            {errors.description && (<span style={{ color: "red" }}>{errors.description}</span>)}
                        </div>
                    </div>

                    <div className="rightSide">
                        <div className="rightSideLeftElement">
                            <div className="inputBox">
                                Start date:
                                <input type="date" value={values.startDate} className={errors.startDate ? "error" : "success"} onChange={onChange("startDate")} />
                                {errors.startDate && (<span style={{ color: "red" }}>{errors.startDate}</span>)}
                            </div>
                            <div className="inputBox">
                                End date:
                                <input type="date" value={values.endDate} className={errors.endDate ? "error" : "success"} onChange={onChange("endDate")} />
                                {errors.endDate && (<span style={{ color: "red" }}>{errors.endDate}</span>)}
                            </div>
                            <div className="inputBox">
                                Status:
                                <input type="text" list="status" className={errors.status ? "error" : "success"} value={values.status} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("status")} onBlur={() => onRelease("status")} onMouseDown={() => setValues({ ...values, status: "" })} />
                                <datalist id="status">
                                    <option value="In progress" />
                                    <option value="On hold" />
                                    <option value="Finished" />
                                    <option value="Canceled" />
                                </datalist>
                                {errors.status && (<span style={{ color: "red" }}>{errors.status}</span>)}
                            </div>
                        </div>
                        <div className="rightSideRightElement">
                            <div className="inputBox">
                                Client:
                                <input type="text" list="client" className={errors.client ? "error" : "success"} value={values.client} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("client")} onBlur={() => onRelease("client")} onMouseDown={() => setValues({ ...values, client: "" })} />
                                <datalist id="client">
                                    {clients.map((client, id) => {
                                        return <option value={client.businessName} key={id}></option>
                                    })}
                                </datalist>
                                {errors.client && (<span style={{ color: "red" }}>{errors.client}</span>)}
                            </div>
                            <div className="inputBox">
                                Team:
                                <input type="text" list="team" className={errors.team ? "error" : "success"} value={values.team} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("team")} onBlur={() => onRelease("team")} onMouseDown={() => setValues({ ...values, team: "" })} />
                                <datalist id="team">
                                    {teams.map((team, id) => {
                                        return <option value={team.teamName} key={id}></option>
                                    })}
                                </datalist>
                                {errors.team && (<span style={{ color: "red" }}>{errors.team}</span>)}
                            </div>
                            <div className="inputBox">
                                Pricing:
                                <input type="text" list="pricing" className={errors.pricing ? "error" : "success"} value={values.pricing} onKeyDown={(event) => {
                                    event.preventDefault();
                                }} onChange={onChange("pricing")} onBlur={() => onRelease("pricing")} onMouseDown={() => setValues({ ...values, pricing: "" })} />
                                <datalist id="pricing">
                                    <option value="Hourly rate" />
                                    <option value="Per capita rate" />
                                    <option value="Fixed price" />
                                    <option value="Not billable" />
                                </datalist>
                                {errors.pricing && (<span style={{ color: "red" }}>{errors.pricing}</span>)}
                            </div>
                            <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <input type="submit" />
                                <Link to="/projects" style={{ textDecoration: "none" }}><div className="cancel">
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

export default EditProject;