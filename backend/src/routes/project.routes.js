import express from "express";
import projectController from "../controller/project.controller";

const router = express.Router()


router.route("/api/project").post(projectController.createProject).get(projectController.listProjects)
router.route("/api/project/:id").get(projectController.projectInfo).put(projectController.editProject)
router.route("/api/project/customerProjects/:id").get(projectController.listCustomerProject)
router.route("/api/project/teamProjects/:id").get(projectController.listTeamProjects)
export default router;