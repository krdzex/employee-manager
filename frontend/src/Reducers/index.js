import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import singleEmployeeReducer from "./singleEmployee";
import teamMemberReducer from "./addTeamMember";
const allReducers = combineReducers({
    loginReducer,
    singleEmployeeReducer,
    teamMemberReducer
})

export default allReducers;

