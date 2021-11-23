import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateCustomer(data) {
    let errors = {}

    data.businessName = !isEmpty(data.businessName) ? data.businessName : ""
    data.img = !isEmpty(data.img) ? data.img : ""
    data.contactName = !isEmpty(data.contactName) ? data.contactName : ""
    data.zipCity = !isEmpty(data.zipCity) ? data.zipCity : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.homeAddress = !isEmpty(data.homeAddress) ? data.homeAddress : ""

    if (Validator.isEmpty(data.img)) {
        errors.img = "Img is required";
    }
    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Phone Number is required";
    }
    if (Validator.isEmpty(data.businessName)) {
        errors.businessName = "Business Name is required";
    }
    if (Validator.isEmpty(data.homeAddress)) {
        errors.homeAddress = "Home Address is required";
    }
    if (Validator.isEmpty(data.contactName)) {
        errors.contactName = "Contact Name is required";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "Status is required";
    }
    if (Validator.isEmpty(data.zipCity)) {
        errors.zipCity = "Zip, City is required";
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