import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { customerInfo } from '../ApiService/customerApi';
import { listCustomerProjects } from '../ApiService/projectApi';
import { teamInfo } from '../ApiService/teamApi';


const SingleCustomer = () => {
    const { id } = useParams();
    useEffect(() => {
        (async function () {
            let customerInformation = await customerInfo(id)
            let customerProjects = await listCustomerProjects(id)
            for (let i = 0; i < customerProjects.length; i++) {
                let teamInformation = await teamInfo(customerProjects[i].team);
                customerProjects[i].team = teamInformation.teamName;
            }
            setValues(customerInformation)
            setCustomerProjects(customerProjects)
        }());
    }, [id])
    const [values, setValues] = useState({})
    const [customerProjects, setCustomerProjects] = useState([])
    return (
        <div className="addEmployeeWrapper">
            <div className="header">
                Customer Profile
            </div>
            <div className="grid">
                <div className="leftSide">
                    <div className="img">
                        <img src={process.env.PUBLIC_URL + `/images/${values.img}`} alt="img"></img>
                    </div>
                    <div className="infoTable" >
                        <table>
                            <thead>
                                <tr>
                                    <td>Project</td>
                                    <td>Team</td>
                                </tr>
                            </thead>
                            <tbody>
                                {customerProjects.map((project, id) => {
                                    return <tr key={id}>
                                        <td>{project.projectName}</td>
                                        <td>{project.team}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="rightSideLeftElement">
                        <div className="inputBox">
                            Business Name:
                            <input type="text" defaultValue={values.businessName} disabled />

                        </div>
                        <div className="inputBox">
                            Contact Name:
                            <input type="text" defaultValue={values.contactName} disabled />

                        </div>
                        <div className="inputBox">
                            Phone number:
                            <input type="text" defaultValue={values.phoneNumber} disabled />

                        </div>
                        <div className="inputBox">
                            Email:
                            <input type="text" defaultValue={values.email} disabled />
                        </div>
                        <div className="inputBox">
                            Phone number:
                            <input type="text" defaultValue={values.phoneNumber} disabled />

                        </div>
                    </div>
                    <div className="rightSideRightElement">
                        <div className="inputBox">
                            Home Address:
                            <input type="text" defaultValue={values.homeAddress} disabled />
                        </div>
                        <div className="inputBox">
                            Zip, City:
                            <input type="text" defaultValue={values.zipCity} disabled />
                        </div>
                        <div className="inputBox">
                            Status:
                            <input type="text" defaultValue={values.status} disabled />

                        </div>
                        <div className="inputBox" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {authHelper.isAuthorizedProjects(project._id) || authHelper.isAuthentcated().user.role === "Admin") && (<Link to={`/editCustomer/${values._id}`} style={{ textDecoration: "none" }}><div className="updateButton">
                                Update
                            </div></Link>
                            <Link to="/customers" style={{ textDecoration: "none" }}><div className="cancel">
                                Cancel
                            </div></Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingleCustomer;