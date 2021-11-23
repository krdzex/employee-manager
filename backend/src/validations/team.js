import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateTeam(data) {
    let errors = {}

    data.teamName = !isEmpty(data.teamName) ? data.teamName : ""
    data.shortDescription = !isEmpty(data.shortDescription) ? data.shortDescription : ""

    if (Validator.isEmpty(data.teamName)) {
        errors.teamName = "Team Name is required";
    }
    if (Validator.isEmpty(data.shortDescription)) {
        errors.shortDescription = "Short Description is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}