import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userInfo } from '../ApiService/userApi';
import moment from "moment"
import { listEmployeeTeamRole } from '../ApiService/teamApi';

const SingleEmployee = () => {
    const { id } = useParams();
    const [teams, setTeams] = useState([])
    useEffect(async () => {
        (async function(){
            let listEmployeeTeams = await listEmployeeTeamRole(id)
            let userInformation = await userInfo(id)
            userInformation.birthDate = moment(userInformation.birthDate).format('YYYY-MM-DD')
            userInformation.employmentStartDate = moment(userInformation.employmentStartDate).format('YYYY-MM-DD')
            userInformation.employmentEndDate = moment(userInformation.employmentEndDate).format('YYYY-MM-DD')
            for (let i = 0; i < listEmployeeTeams.length; i++) {
                let newEmyploees = listEmployeeTeams[i].emyploees.filter(team => team._id === id);
                listEmployeeTeams[i].emyploees = newEmyploees
            }
            setValues(userInformation)
            setTeams(listEmployeeTeams)
        }())
    }, [])
    const [values, setValues] = useState({})
    return (
        <div className="addEmployeeWrapper">
            <div className="header">
                Employee Profile
            </div>
            <div className="grid">
                <div className="leftSide">
                    <div className="img">
                        <img src={process.env.PUBLIC_URL + `/images/${values.img}`} alt="img"></img>
                    </div>
                    <div className="inputBox">
                        Contracted Salary:
                        <input type="number" defaultValue={values.contractedSalary} disabled />
                    </div>
                    <div className="infoTable" style={{ marginTop: "20px" }}>
                        <table>
                            <thead>
                                <tr>
                                    <td>Team</td>
                                    <td>Role</td>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team, id) => {
                                    return <tr key={id}>
                                        <td>{team.teamName}</td>
                                        <td>{team.emyploees[0].role}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="rightSideLeftElement">
                        <div className="inputBox">
                            First Name:
                            <input type="text" defaultValue={values.firstName} disabled />

                        </div>
                        <div className="inputBox">
                            Last Name:
                            <input type="text" defaultValue={values.lastName} disabled />

                        </div>
                        <div className="inputBox">
                            Email:
                            <input type="text" defaultValue={values.email} disabled />

                        </div>
                        <div className="inputBox">
                            Phone number:
                            <input type="text" defaultValue={values.phoneNumber} disabled />

                        </div>
                        <div className="inputBox">
                            Birth Date:
                            <input type="date" defaultValue={values.birthDate} disabled />

                        </div>
                    </div>
                    <div className="rightSideRightElement">
                        <div className="inputBox">
                            Employment Start Date:
                            <input type="date" defaultValue={values.employmentStartDate} disabled />

                        </div>
                        <div className="inputBox">
                            Status:
                            <input type="text" defaultValue={values.status} disabled />

                        </div>
                        <div className="inputBox">
                            Job Title:
                            <input type="text" defaultValue={values.jobTitle} disabled />

                        </div>
                        <div className="inputBox">
                            Employment End Date:
                            <input type="date" defaultValue={values.employmentEndDate} disabled />

                        </div>
                        <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Link to={`/editEmployee/${values._id}`} style={{ textDecoration: "none" }}><div className="updateButton">
                                Update
                            </div></Link>
                            <Link to="/emyploees" style={{ textDecoration: "none" }}><div className="cancel">
                                Cancel
                            </div></Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingleEmployee;