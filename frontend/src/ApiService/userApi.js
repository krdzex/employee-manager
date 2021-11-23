import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createUser = (user) => {
    return fetch(`${url}/api/users`, {
        method: "POST",
        body: user
    }).then(response => response.json()).catch(err => console.log(err))
}

const listUsers = () => {
    return fetch(`${url}/api/users`, {
        method: "GET",
    }).then(response => response.json()).catch(err => console.log(err))
}

const userInfo = (id) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}
const updateUser = (id, data) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "PUT",
        body: data
    }).then(response => response.json()).catch(err => console.log(err))
}

export { createUser, listUsers, userInfo, updateUser }