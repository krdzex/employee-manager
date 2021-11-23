const teamMemberReducer = (state = false, action) => {
    switch (action.type) {
        case "OPEN_POP_UP_TEAM_MEMBER":
            return state = true
        case "CLOSE_POP_UP_TEAM_MEMBER":
            return state = false
        default:
            return state;
    }
}
export default teamMemberReducer;