import mongoose from "mongoose"

const TeamSchema = new mongoose.Schema({
    teamName: { type: String, trim: true, unique: "Team Name already exists" },
    shortDescription: { type: String, trim: true },
    emyploees: [{ _id: mongoose.Types.ObjectId, role: String }]
})

export default mongoose.model("Team", TeamSchema)


