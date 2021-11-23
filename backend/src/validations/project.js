import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateProject(data) {
    let errors = {}

    data.projectName = !isEmpty(data.projectName) ? data.projectName : ""
    data.description = !isEmpty(data.description) ? data.description : ""
    data.startDate = !isEmpty(data.startDate) ? data.startDate : ""
    data.endDate = !isEmpty(data.endDate) ? data.endDate : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.client = !isEmpty(data.client) ? data.client : ""
    data.team = !isEmpty(data.team) ? data.team : ""
    data.pricing = !isEmpty(data.pricing) ? data.pricing : ""

    if (Validator.isEmpty(data.projectName)) {
        errors.projectName = "Project Name is required";
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description is required";
    }

    if (Validator.isEmpty(data.startDate)) {
        errors.startDate = "Start Date is required";
    }
    if (Validator.isEmpty(data.endDate)) {
        errors.endDate = "End Date is required";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "Status is required";
    }
    if (Validator.isEmpty(data.client)) {
        errors.client = "Client is required";
    }
    if (Validator.isEmpty(data.team)) {
        errors.team = "Team is required";
    }
    if (Validator.isEmpty(data.pricing)) {
        errors.pricing = "Pricing is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }

}