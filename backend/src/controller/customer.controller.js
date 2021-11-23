import Customer from "../models/customer.model"
import validateCustomer from "../validations/customer"
import validateEdit from "../validations/editCustomer"
import fs from "fs"
import _ from "lodash"
import { promisify } from "util";
import errorHandler from "../helpers/dbErrorHandler"

const createCustomer = (req, res) => {
    const deleteImg = promisify(fs.unlink)
    if (req.file !== undefined) {
        req.body.img = req.file.filename;
    } else {
        req.body.img = "";
    }
    const { errors, isValid } = validateCustomer(req.body);

    const customer = new Customer(req.body);

    if (!isValid) {
        if (customer.img !== "") {
            deleteImg(`../frontend/public/images/${customer.img}`)
        }
        return res.status(400).json(errors)
    }
    customer.save((err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created customer!"
        })
    })
}

const listCustomer = (req, res) => {
    Customer.find((err, customers) => {
        res.status(200).json(customers)
    }).select("-img -zipCity -homeAddress -phoneNumber")
}

const customerInfo = (req, res) => {
    let id = req.params.id
    Customer.findById(id).exec().then(user => {
        res.status(200).json(user)
    })
}

const editCustomer = (req, res) => {
    let id = req.params.id;
    Customer.findById(id).exec((err, result) => {
        const originalImg = result.img;
        const deleteImg = promisify(fs.unlink)
        let customer = result;
        customer = _.extend(customer, req.body)
        const { errors, isValid } = validateEdit(customer);
        if (!isValid) {
            if (req.file !== undefined) {
                deleteImg(`../frontend/public/images/${req.file.filename}`)
            }
            return res.status(400).json(errors)
        }
        customer = _.extend(customer, { img: req.file.filename })
        customer.save((err, result) => {
            if (err) {
                if (req.file !== undefined) {
                    deleteImg(`../frontend/public/images/${req.file.filename}`)
                }
                return res.status(400).json(errorHandler.getUniqueErrorMessage(err))
            } else {
                deleteImg(`../frontend/public/images/${originalImg}`)
                res.json({ message: "Successfuly edited customer" })
            }
        })
    })
}


export default { createCustomer, listCustomer, customerInfo, editCustomer }