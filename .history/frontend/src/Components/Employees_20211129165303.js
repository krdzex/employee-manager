import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listUsers } from '../ApiService/userApi';
import moment from "moment"
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { addSingleRecipeId } from '../Actions';
const Employees = () => {
    const dispatch = useDispatch()
    const [allEmployees, setAllEmployees] = useState([])
    useEffect(() => {
        listUsers().then(res => {
            res.forEach(employee => {
                let birthYear = moment(employee.birthDate)
                let timeNow = moment(Date.now())
                let years = timeNow.diff(birthYear, "years");
                employee.birthDate = years
            });
            setAllEmployees(res)
        }).catch(err => console.log(err))
    }, [])
    return (
        <div className="employeesWrapper">
            <div className="header">
                <div className="title">
                    Employees
                </div>
                <Link to="/employeeAdd"><div className="iconAdd">
                    <Icon icon="carbon:add-filled" />
                </div></Link>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {allEmployees.map((employee, id) => (
                            <tr key={id}>
                                <td>
                                    {employee.firstName}
                                </td>
                                <td>
                                    {employee.lastName}
                                </td>
                                <td>
                                    {employee.birthDate}
                                </td>
                                <td>
                                    {employee.email}
                                </td>
                                <td>
                                    {employee.phoneNumber}
                                </td>
                                <td>
                                {authHelper.isAuthentcated().user.role === "Admin" && (<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        <Link to={`/editEmployee/${employee._id}`} ><p style={{ marginRight: "10px" }}>Edit</p></Link>
                                        <Link to={`/viewEmoloyee/${employee._id}`} onClick={() => dispatch(addSingleRecipeId(employee._id))}><p style={{ marginRight: "10px" }}>View</p></Link>
                                    </div>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Employees;