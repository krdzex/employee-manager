import express from "express";
import customerController from "../controller/customer.controller";
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


router.route("/api/customer").post(upload.single('img'), customerController.createCustomer).get(customerController.listCustomer)
router.route("/api/customer/:id").get(customerController.customerInfo).put(upload.single('img'), customerController.editCustomer)
export default router;