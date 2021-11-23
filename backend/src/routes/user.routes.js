import express from "express";
import userController from "../controller/user.controller";
import multer from "multer"
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })


router.route("/api/users").post(upload.single('img'), userController.createUser).get(userController.listUsers)
router.route("/api/users/:id").get(userController.userInfo).put(upload.single('img'),userController.editUser)
export default router;