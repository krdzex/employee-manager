
export const logIn = () => {
    return {
        type: "LOGGED_IN"
    }
}
export const logOut = () => {
    return {
        type: "LOGGED_OUT"
    }
}


export const addSingleRecipeId = (id) => {
    return {
        type: "ADD_EMPLOYEE_ID",
        payload: id
    }
}


export const openTeamMemberPopUp = () => {
    return {
        type: "OPEN_POP_UP_TEAM_MEMBER"
    }
}


export const closeTeamMemberPopUp = () => {
    return {
        type: "CLOSE_POP_UP_TEAM_MEMBER",
    }
}