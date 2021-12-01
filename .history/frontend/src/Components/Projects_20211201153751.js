import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customerInfo } from '../ApiService/customerApi';
import { listProjects } from '../ApiService/projectApi';
import { teamInfo } from '../ApiService/teamApi';
import authHelper from '../Auth/authHelper';

const Projects = () => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        (async function () {
            const projects = await listProjects();
            for (let i = 0; i < projects.length; i++) {
                let projectInfo = await customerInfo(projects[i].client)
                let teamInformation = await teamInfo(projects[i].team);
                projects[i].team = teamInformation.teamName;
                projects[i].client = projectInfo.businessName;
            }
            setProjects(projects)
        }())
    }, [])


    return (
        <div className="projectsWrapper">
            <div className="header">
                <div className="title">
                    Projects
                </div>
                {authHelper.isAuthentcated().user.role === "Admin" && (<Link to="/addProject"><div className="iconAdd">
                    <Icon icon="carbon:add-filled" />
                </div></Link>)}
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <td>Project Name</td>
                            <td>Customer Name</td>
                            <td>Team Name</td>
                            <td>Status</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, id) => (
                            <tr key={id}>
                                <td>
                                    {project.projectName}
                                </td>
                                <td>
                                    {project.client}
                                </td>
                                <td>
                                    {project.team}
                                </td>
                                <td>
                                    {project.status}
                                </td>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        {(authHelper.isAuthorizedProjects(project._id) || authHelper.isAuthentcated().user.role === "Admin") && (<Link to={`/editProject/${project._id}`} ><p style={{ marginRight: "10px" }}>Edit</p></Link>)}
                                        <Link to={`/viewProject/${project._id}`} ><p style={{ marginRight: "10px" }}>View</p></Link>
                                    </div>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Projects;