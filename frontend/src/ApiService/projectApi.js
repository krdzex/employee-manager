import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createProject = (project) => {
    return fetch(`${url}/api/project`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(project)
    }).then(response => response.json()).catch(err => console.log(err))
}

const listProjects = () => {
    return fetch(`${url}/api/project`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const projectInfo = (id) => {
    return fetch(`${url}/api/project/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateProject = (id, data) => {
    return fetch(`${url}/api/project/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}


const listCustomerProjects = (id) => {

    return fetch(`${url}/api/project/customerProjects/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const listTeamProjects = (id) => {

    return fetch(`${url}/api/project/teamProjects/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}


export { createProject, listProjects, projectInfo, updateProject,listCustomerProjects,listTeamProjects }