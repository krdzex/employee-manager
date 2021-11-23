import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateEdit(data) {
    let errors = {}

    
    if (data.contractedSalary === null) {
        errors.contractedSalary = "Salary is required";
    }
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name is required";
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name is required";
    }
    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Phone Number is required";
    }
    if (data.birthDate === null) {
        errors.birthDate = "Birth Date is required";
    }
    if (data.employmentStartDate === null) {
        errors.employmentStartDate = "Start date is required";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "Status is required";
    }
    if (Validator.isEmpty(data.jobTitle)) {
        errors.jobTitle = "Job title is required";
    }
    if (data.employmentEndDate === null) {
        errors.employmentEndDate = "End date is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (!Validator.isMobilePhone(data.phoneNumber)) {
        errors.phoneNumber = "Phone Number is invalid";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}