import Project from "../models/project.model"
import errorHandler from "../helpers/dbErrorHandler"
import validateProject from "../validations/project"
import validateEditProject from "../validations/editProject"
import _ from "lodash"

const createProject = (req, res) => {

    const { errors, isValid } = validateProject(req.body);
    const project = new Project(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    project.save((err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created project!"
        })
    })
}

const listProjects = (req, res) => {
    Project.find((err, projects) => {
        res.status(200).json(projects)
    })
}

const editProject = (req, res) => {
    let id = req.params.id;
    Project.findById(id).exec((err, result) => {
        let project = result;
        project = _.extend(project, req.body)
        console.log(req.body)
        const { errors, isValid } = validateEditProject(project);
        if (!isValid) {
            return res.status(400).json(errors)
        }
        project.save((err, result) => {
            if (err) {
                return res.status(400).json(errorHandler.getUniqueErrorMessage(err))
            }
            res.json({ message: "Successfuly edited project" })
        })
    })
}


const projectInfo = (req, res) => {
    let id = req.params.id
    Project.findById(id).then(project => {
        res.status(200).json(project)
    })
}

const listCustomerProject = (req, res) => {
    let id = req.params.id
    Project.find({client: id}).then(projects => {
        res.status(200).json(projects)
    })
}

const listTeamProjects = (req,res) =>{
    let id = req.params.id
    Project.find({team: id}).then(projects => {
        res.status(200).json(projects)
    })
}

export default { listProjects, createProject, editProject, projectInfo,listCustomerProject,listTeamProjects }