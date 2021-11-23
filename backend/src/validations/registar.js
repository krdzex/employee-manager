import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateRegistar(data) {
    let errors = {}

    data.userName = !isEmpty(data.userName) ? data.userName : ""
    data.img = !isEmpty(data.img) ? data.img : ""
    data.role = !isEmpty(data.role) ? data.role : ""
    data.contractedSalary = !isEmpty(data.contractedSalary) ? data.contractedSalary : ""
    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : ""
    data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : ""
    data.employmentStartDate = !isEmpty(data.employmentStartDate) ? data.employmentStartDate : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.jobTitle = !isEmpty(data.jobTitle) ? data.jobTitle : ""
    data.employmentEndDate = !isEmpty(data.employmentEndDate) ? data.employmentEndDate : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    if (Validator.isEmpty(data.userName)) {
        errors.userName = "Username is required";
    }
    if (Validator.isEmpty(data.img)) {
        errors.img = "Img is required";
    }
    if (Validator.isEmpty(data.role)) {
        errors.role = "Role is required";
    }
    if (Validator.isEmpty(data.contractedSalary)) {
        errors.contractedSalary = "Salary is required";
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name is required";
    }
    if (Validator.isEmpty(data.userName)) {
        errors.userName = "Username is required";
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name is required";
    }
    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Phone Number is required";
    }
    if (Validator.isEmpty(data.birthDate)) {
        errors.birthDate = "Birth Date is required";
    }
    if (Validator.isEmpty(data.employmentStartDate)) {
        errors.employmentStartDate = "Start date is required";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "Status is required";
    }
    if (Validator.isEmpty(data.jobTitle)) {
        errors.jobTitle = "Job title is required";
    }
    if (Validator.isEmpty(data.employmentEndDate)) {
        errors.employmentEndDate = "End date is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    if (!Validator.isMobilePhone(data.phoneNumber)) {
        errors.phoneNumber = "Phone Number is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}