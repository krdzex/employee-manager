import React from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router';
import { teamInfo } from './ApiService/teamApi';
import authHelper from './Auth/authHelper';
import OnlyAdminRoute from './Auth/OnlyAdminRoute';
import PrivateRouteUser from './Auth/PrivateRouteUser';
import PrivateRoute from './Auth/PrivateRouteUser';
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
const MainRouter = () => {

    function RequireAuth({ children }) {
        let location = useLocation();
        if (!authHelper.isAuthentcated()) {
            return <Navigate to="/signIn" state={{ from: location }} />;
        }
        return children;
    }

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
                </Route>

                <Route path="/" element={<PrivateRoute />}>

                </Route>

                <Route exact path="/signIn" element={<SignIn />} />

                <Route exact path="/" element={<OnlyAdminRoute />}>
                    <Route exact path="/emyploees" element={<Employees />} />
                </Route>
                <Route exact path="/viewEmoloyee/:id" element={<SingleEmployee />} />
                <Route exact path="/editEmployee/:id" element={<EditEmployee />} />
                <Route exact path="/customers" element={<OnlyAdminRoute />}>
                    <Route exact path="/customers" element={<Customers />} />
                </Route>

                <Route exact path="/addCustomer" element={<AddCustomer />} />
                <Route exact path="/viewCustomer/:id" element={<SingleCustomer />} />
                <Route exact path="/editCustomer/:id" element={<EditCustomer />} />

                <Route exact path="/teams" element={<RequireAuth><Teams /></RequireAuth>} />



                <Route path="/viewTeam/:id" element={<PrivateRouteUser />}>
                    <Route path="" element={<SingleTeam />} />
                </Route>


                <Route exact path="/projects" element={<PrivateRoute />}>
                    <Route exact path="/projects" element={<Projects />} />
                </Route>

                <Route exact path="/addProject" element={<AddProject />} />
                <Route exact path="/viewProject/:id" element={<SingleProject />} />
                <Route exact path="/editProject/:id" element={<EditProject />} />
            </Routes>
        </div>

    );
};

export default MainRouter;