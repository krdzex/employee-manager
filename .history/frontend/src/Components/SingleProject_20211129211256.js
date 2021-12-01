import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { customerInfo } from '../ApiService/customerApi';
import { projectInfo } from '../ApiService/projectApi';
import { teamInfo } from '../ApiService/teamApi';
import moment from 'moment';

const SingleProject = () => {

    const { id } = useParams();

    useEffect(() => {
        (async function () {
            const projectInformations = await projectInfo(id);
            projectInformations.startDate = moment(projectInformations.startDate).format('YYYY-MM-DD')
            projectInformations.endDate = moment(projectInformations.endDate).format('YYYY-MM-DD')
            let customerInformations = await customerInfo(projectInformations.client)
            let teamInformation = await teamInfo(projectInformations.team);
            projectInformations.team = teamInformation.teamName;
            projectInformations.client = customerInformations.businessName;
            setValues(projectInformations)
        }())
    }, [id])


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

    return (
        <div className="addProjectWrapper">
            <div className="header">
                Project Info
            </div>
            <div className="grid" id="gridProject">
                <div className="leftSide">
                    <div className="inputBox">
                        Project Name:
                        <input type="text" defaultValue={values.projectName} disabled />

                    </div>
                    <div className="inputBox">
                        Description:
                        <textarea type="text" defaultValue={values.description} disabled />

                    </div>
                </div>

                <div className="rightSide">
                    <div className="rightSideLeftElement">
                        <div className="inputBox">
                            Start date:
                            <input type="date" defaultValue={values.startDate} disabled />
                        </div>
                        <div className="inputBox">
                            End date:
                            <input type="date" defaultValue={values.endDate} disabled />
                        </div>
                        <div className="inputBox">
                            Status:
                            <input type="text" defaultValue={values.status} disabled />
                        </div>
                    </div>
                    <div className="rightSideRightElement">
                        <div className="inputBox">
                            Client:
                            <input type="text" defaultValue={values.client} disabled />
                        </div>
                        <div className="inputBox">
                            Team:
                            <input type="text" defaultValue={values.team} disabled />
                        </div>
                        <div className="inputBox">
                            Pricing:
                            <input type="text" defaultValue={values.pricing} disabled />
                        </div>
                        <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Link to={`/editProject/${values._id}`} style={{ textDecoration: "none" }}><div className="updateButton">
                                Update
                            </div></Link>
                            <Link to="/projects" style={{ textDecoration: "none" }}><div className="cancel">
                                Cancel
                            </div></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProject;