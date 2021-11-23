import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authHelper from '../Auth/authHelper';


const Header = () => {
    const logged = useSelector(state => state.loginReducer)
    const [show, setShow] = useState(false)
    return (
        <div className="headerWrapper">
            <Link to="/about"><div className="leftSide">
                <h2>Employee Manager</h2>
            </div></Link>

            <div className="rightSide">
                <div className="navigation">
                    <ul >
                        {authHelper.isAuthentcated() || logged ? <li>
                            <ul className={show ? "dropDownManu show" : "dropDownManu"} onClick={() => setShow(!show)}>
                                <li style={{ cursor: "pointer", paddingLeft: "0px", paddingRight: "0px" }}>
                                    Database
                                </li>
                                <Link to="/emyploees">
                                    <li>
                                        Employees
                                    </li>
                                </Link>
                                <Link to="/teams">
                                    <li>
                                        Teams
                                    </li>
                                </Link>
                                <Link to="/customers">
                                    <li>
                                        Customers
                                    </li>
                                </Link>
                                <Link to="/projects">
                                    <li>
                                        Projects
                                    </li>
                                </Link>

                            </ul>
                        </li> : ""}
                        <li>
                            <Link to="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/services">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/team">
                                Team
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navigationLogin">
                    {authHelper.isAuthentcated() || logged ?
                        <div onClick={() => {authHelper.signOut();window.location.reload()}} style={{cursor:"pointer"}}>
                            Sign Out
                        </div> :
                        <Link to="/signIn">
                            Login
                        </Link>}
                </div>
            </div>
        </div>
    );
};

export default Header;