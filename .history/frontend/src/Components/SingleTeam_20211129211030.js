import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { customerInfo } from '../ApiService/customerApi';
import { listTeamProjects, projectInfo } from '../ApiService/projectApi';
import { teamInfo } from '../ApiService/teamApi';

const SingleTeam = () => {

    const { id } = useParams();
const [allTeamProjects,setAllTeamProjects] = useState([])
    useEffect(async () => {
        (async function(){
            
        })
        try {
            let teamInformation = await teamInfo(id)
            let teamProjects = await listTeamProjects(id)
            for (let i = 0; i < teamProjects.length; i++) {
                const clientInformation = await customerInfo(teamProjects[i].client);
                teamProjects[i].client = clientInformation.businessName
            }
            setAllTeamProjects(teamProjects)
            setValues(teamInformation)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const [values, setValues] = useState({
        teamName: "",
        shortDescription: "",
        redirect: false
    })


    if (values.redirect) return <Navigate to="/teams" />
    return (
        <div className="addTeamWrapper">
            <div className="header">
                Team Info
            </div>
            <div className="grid" id="gridTeam">
                <div className="leftSide">
                    <div className="inputBox">
                        Team Name:
                        <input type="text" defaultValue={values.teamName} disabled />
                    </div>
                    <div className="inputBox">
                        Short description:
                        <textarea defaultValue={values.shortDescription} disabled />
                    </div>
                </div>
                <div className="rightSide">
                    <div className="infoTable" >
                        <table>
                            <thead>
                                <tr>
                                    <td>Project</td>
                                    <td>Customer</td>
                                </tr>
                            </thead>
                            <tbody>
                            {allTeamProjects.map((project, id) => {
                                    return <tr key={id}>
                                        <td>{project.projectName}</td>
                                        <td>{project.client}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", alignItems: "center" }}>
                <Link to={`/editTeam/${id}`} style={{ textDecoration: "none" }}><div className="updateButton">
                    Update
                </div></Link>
                <Link to="/teams" style={{ textDecoration: "none" }}><div className="cancel">
                    Cancel
                </div></Link>
            </div>
        </div >
    );
};

export default SingleTeam;