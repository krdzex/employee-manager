import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateTeamMember(data) {
    let errors = {}

    data._id = !isEmpty(data._id) ? data._id : ""
    data.role = !isEmpty(data.role) ? data.role : ""


    if (Validator.isEmpty(data._id)) {
        errors._id = "Employee is required";
    }
    if (Validator.isEmpty(data.role)) {
        errors.role = "Role is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}