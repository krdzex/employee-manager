import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createTeam = (team) => {
    console.log(team)
    return fetch(`${url}/api/team`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(team)
    }).then(response => response.json()).catch(err => console.log(err))
}

const listTeams = () => {
    return fetch(`${url}/api/team`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const teamInfo = (id) => {
    return fetch(`${url}/api/team/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateTeam = (id, data) => {
    return fetch(`${url}/api/team/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}

const addTeamMember = (id, data) => {
    return fetch(`${url}/api/team/addMember/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}


const listTeamMembers = (id) => {
    return fetch(`${url}/api/team/listMembers/${id}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}
const deleteTeam = (id) => {
    return fetch(`${url}/api/team/${id}`, {
        method: "DELETE",
    }).then(response => response.json()).catch(err => console.log(err))
}

const listEmployeeTeamRole = (id) => {
    return fetch(`${url}/api/team/employeeTeams/${id}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}


export { createTeam, listTeams, teamInfo, updateTeam, listTeamMembers, deleteTeam, addTeamMember, listEmployeeTeamRole }