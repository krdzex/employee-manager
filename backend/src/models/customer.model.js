import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema({
    businessName: { type: String, trim: true, unique: "Business Name already exists" },
    img: { type: String, trim: true },
    contactName: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    homeAddress: { type: String, trim: true },
    zipCity: { type: String, trim: true },
    status: { type: String, trim: true },
    email: {
        type: String, trim: true,
        unique: "Email already exists",
    },
})

export default mongoose.model("Customer", CustomerSchema)


