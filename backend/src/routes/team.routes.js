import express from "express";
import teamController from "../controller/team.controller";

const router = express.Router()


router.route("/api/team").post(teamController.createTeam).get(teamController.listTeams)
router.route("/api/team/:id").get(teamController.teamInfo).put(teamController.editTeam).delete(teamController.deleteTeam)
router.route("/api/team/addMember/:id").put(teamController.addTeamMembers)
router.route("/api/team/deleteMember/:id").put(teamController.deleteTeamMember)
router.route("/api/team/updateMember/:id").put(teamController.updateTeamMember)
router.route("/api/team/listMembers/:id").get(teamController.listTeamMembers)
router.route("/api/team/employeeTeams/:id").get(teamController.listEmployeeTeams)
export default router;