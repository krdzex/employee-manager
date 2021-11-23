import User from "../models/user.model"
import errorHandler from "../helpers/dbErrorHandler"
import validateSignUp from "../validations/registar"
import validateEdit from "../validations/edit"
import _ from "lodash"
import fs from "fs"
import { promisify } from "util";
const createUser = (req, res) => {
    const deleteImg = promisify(fs.unlink)
    if (req.file !== undefined) {
        req.body.img = req.file.filename;
    } else {
        req.body.img = "";
    }

    const { errors, isValid } = validateSignUp(req.body);

    const user = new User(req.body);

    if (!isValid) {
        if (user.img !== "") {
            deleteImg(`../frontend/public/images/${user.img}`)
        }
        return res.status(400).json(errors)
    }
    user.save((err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created user!"
        })
    })
}

const listUsers = (req, res) => {
    User.find((err, users) => {
        res.status(200).json(users)
    })
}

const editUser = (req, res) => {
    let id = req.params.id;
    User.findById(id).exec((err, result) => {
        const originalImg = result.img;
        const deleteImg = promisify(fs.unlink)
        let user = result;
        user = _.extend(user, req.body)
        const { errors, isValid } = validateEdit(user);
        if (!isValid) {
            if (req.file !== undefined) {
                deleteImg(`../frontend/public/images/${req.file.filename}`)
            }
            return res.status(400).json(errors)
        }

        if (req.file !== undefined) {
            user = _.extend(user, { img: req.file.filename })
        }
        
        user.save((err, result) => {
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

const userInfo = (req, res) => {
    let id = req.params.id
    User.findById(id).select("-userName -hashed_password -created -role -salt").then(user => {
        res.status(200).json(user)
    })
}

export default { listUsers, createUser, editUser, userInfo }