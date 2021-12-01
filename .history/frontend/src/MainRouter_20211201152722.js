import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import OnlyAdminRoute from './Auth/OnlyAdminRoute';
import PrivateRouteUser from './Auth/PrivateRouteUser';
import PrivateRoute from './Auth/PrivateRoute';
import About from './Components/About';
import AddCustomer from './Components/AddCustomer';
import AddEmployee from './Components/AddEmployee';
import AddProject from './Components/AddProject';
import AddTeam from './Components/AddTeam';
import Contact from './Components/Contact';
import Customers from './Components/Customers';
import EditCustomer from './Components/EditCustomer';
import EditEmployee from './Components/EditEmployee';
import EditProject from './Components/EditProject';
import EditTeam from './Components/EditTeam';
import Employees from './Components/Employees';
import Header from './Components/Header';
import Projects from './Components/Projects';
import Services from './Components/Services';
import SignIn from './Components/SignIn';
import SingleCustomer from './Components/SingleCustomer';
import SingleEmployee from './Components/SingleEmployee';
import SingleProject from './Components/SingleProject';
import SingleTeam from './Components/SingleTeam';
import Team from './Components/Team';
import Teams from './Components/Teams';
import BlockedRoute from './Auth/BlockedRoute';
import PrivateProjectRoute from './Auth/PrivateProjectRoute';
const MainRouter = () => {


    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/team" element={<Team />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route path="/" element={<Navigate replace to="/about" />} />

                <Route path="/" element={<OnlyAdminRoute />}>
                    <Route exact path="employeeAdd" element={<AddEmployee />} />
                    <Route exact path="addTeam" element={<AddTeam />} />
                    <Route exact path="editTeam/:id" element={<EditTeam />} />
                    <Route exact path="addCustomer" element={<AddCustomer />} />
                    <Route exact path="viewCustomer/:id" element={<SingleCustomer />} />
                    <Route exact path="editCustomer/:id" element={<EditCustomer />} />
                    <Route exact path="viewEmoloyee/:id" element={<SingleEmployee />} />
                    <Route exact path="editEmployee/:id" element={<EditEmployee />} />
                    <Route exact path="addProject" element={<AddProject />} />
                    <Route exact path="editProject/:id" element={<EditProject />} />
                </Route>

                <Route path="/" element={<PrivateRoute />}>
                    <Route exact path="employees" element={<Employees />} />
                    <Route exact path="customers" element={<Customers />} />
                    <Route exact path="teams" element={<Teams />} />
                    <Route exact path="projects" element={<Projects />} />
                </Route>

                <Route path="/" element={<BlockedRoute />}>
                    <Route exact path="signIn" element={<SignIn />} />
                </Route>

                <Route path="/" element={<PrivateRouteUser />}>
                    <Route path="viewTeam/:id" element={<SingleTeam />} />
                </Route>

                <Route path="/" element={<PrivateProjectRoute />}>
                    <Route exact path="viewProject/:id" element={<SingleProject />} />
                </Route>

            </Routes>
        </div>

    );
};

export default MainRouter;