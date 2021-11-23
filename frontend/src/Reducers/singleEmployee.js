const singleEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_EMPLOYEE_ID":
            return state = action.payload
        default:
            return state;
    }
}
export default singleEmployeeReducer;