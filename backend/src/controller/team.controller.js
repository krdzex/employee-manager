import Team from "../models/team.model"
import errorHandler from "../helpers/dbErrorHandler"
import validateTeam from "../validations/team"
import validateTeamMember from "../validations/newTeamMember"
import _ from "lodash"
import User from "../models/user.model"

const createTeam = (req, res) => {

    const { errors, isValid } = validateTeam(req.body);
    const team = new Team(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    team.save((err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created team!"
        })
    })
}

const listTeams = (req, res) => {
    Team.find((err, teams) => {
        res.status(200).json(teams)
    })
}

const editTeam = (req, res) => {
    let id = req.params.id;
    Team.findById(id).exec((err, result) => {
        let team = result;
        team = _.extend(team, req.body)
        const { errors, isValid } = validateTeam(team);
        if (!isValid) {
            return res.status(400).json(errors)
        }
        team.save((err, result) => {
            if (err) {
                return res.status(400).json(errorHandler.getUniqueErrorMessage(err))
            }
            res.json({ message: "Successfuly edited team" })
        })
    })
}

const addTeamMembers = (req, res) => {
    let id = req.params.id;
    const { errors, isValid } = validateTeamMember(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Team.findById(id).exec((err, result) => {

        for (let i = 0; i < result.emyploees.length; i++) {
            if (result.emyploees[i]._id.toString() === req.body._id) {
                return res.status(400).json({ id: "That employee is already in team" })
            }
        }
        result.emyploees.push(req.body);
        result.save();
        res.json({ message: "Added" });
    })
}
const deleteTeamMember = (req, res) => {
    let id = req.params.id;
    Team.findById(id).exec((err, result) => {
        let memberId = req.body._id
        for (var i = 0; i < result.emyploees.length; i++) {
            if (result.emyploees[i]._id.toString() === memberId) {
                result.emyploees.splice(i, 1);
            }
        }
        result.save();
        res.json({ message: "Deleted" });
    })
}
const updateTeamMember = (req, res) => {
    let id = req.params.id;
    Team.findById(id).exec((err, result) => {
        result.emyploees.push(req.body);
        result.save();
        res.json({ message: "Added" });
    })
}

const listTeamMembers = async (req, res) => {
    try {
        let id = req.params.id;
        const listMembers = [];
        let newTeam = await Team.findById(id).then(res => res.emyploees)
        for (var i = 0; i < newTeam.length; i++) {
            await User.findById(newTeam[i]._id.toString()).then((userResult, err) => {
                listMembers.push({ userName: userResult.userName, role: newTeam[i].role, img: userResult.img })
            })
        }
        res.json(listMembers);
    } catch (error) {
    }

}

const teamInfo = (req, res) => {
    let id = req.params.id
    Team.findById(id).then(team => {
        res.status(200).json(team)
    })
}

const deleteTeam = (req, res) => {
    let id = req.params.id
    Team.findByIdAndDelete(id).then(ressult => {
        res.status(200).json(ressult)
    })
}

const listEmployeeTeams = (req, res) => {
    let id = req.params.id
    Team.find({ "emyploees._id": id }).then(teams => {
        res.status(200).json(teams)
    })
}

export default { listTeams, createTeam, editTeam, teamInfo, addTeamMembers, deleteTeamMember, updateTeamMember, listTeamMembers, deleteTeam, listEmployeeTeams }