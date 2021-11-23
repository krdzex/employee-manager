import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateEditProject(data) {

    let errors = {}

    if (Validator.isEmpty(data.projectName)) {
        errors.projectName = "Project Name is required";
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description is required";
    }

    if (data.startDate === null) {
        errors.startDate = "Start Date is required";
    }
    if (data.endDate === null) {
        errors.endDate = "End Date is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}