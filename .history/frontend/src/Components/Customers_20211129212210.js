import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { addSingleRecipeId } from '../Actions';
import { listCustomers } from '../ApiService/customerApi';
import authHelper from '../Auth/authHelper';
const Customers = () => {
    const dispatch = useDispatch()
    const [allCustomers, setAllCustomers] = useState([])
    useEffect(() => {
        listCustomers().then(res =>
            setAllCustomers(res)
        ).catch(err => console.log(err))
    }, [])
    return (
        <div className="customersWrapper">
            <div className="header">
                <div className="title">
                    Customers
                </div>
                {authHelper.isAuthentcated().user.role === "Admin" && (<Link to="/addCustomer"><div className="iconAdd">
                    <Icon icon="carbon:add-filled" />
                </div></Link>)}
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <td>Bussines Name</td>
                            <td>Contact Name</td>
                            <td>Email</td>
                            <td>Status</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {allCustomers.map((customer, id) => (
                            <tr key={id}>
                                <td>
                                    {customer.businessName}
                                </td>
                                <td>
                                    {customer.contactName}
                                </td>
                                <td>
                                    {customer.email}
                                </td>
                                <td>
                                    {customer.status}
                                </td>
                                <td>
                                    {authHelper.isAuthentcated().user.role === "Admin" && (<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        <Link to={`/editCustomer/${customer._id}`} ><p style={{ marginRight: "10px" }}>Edit</p></Link>
                                        <Link to={`/viewCustomer/${customer._id}`} ><p style={{ marginRight: "10px" }}>View</p></Link>
                                    </div>)}
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Customers;