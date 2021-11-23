import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createCustomer = (customer) => {
    return fetch(`${url}/api/customer`, {
        method: "POST",
        body: customer
    }).then(response => response.json()).catch(err => console.log(err))
}

const listCustomers = () => {
    return fetch(`${url}/api/customer`, {
        method: "GET",
    }).then(response => response.json()).catch(err => console.log(err))
}

const customerInfo = (id) => {
    return fetch(`${url}/api/customer/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateCustomer = (id, data) => {
    return fetch(`${url}/api/customer/${id}`, {
        method: "PUT",
        body: data
    }).then(response => response.json()).catch(err => console.log(err))
}

export { createCustomer, listCustomers,customerInfo,updateCustomer }