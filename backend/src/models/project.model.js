import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
    projectName: { type: String, trim: true, unique: "Project Name already exists" },
    description: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String },
    client: { type: mongoose.Types.ObjectId },
    team: { type: mongoose.Types.ObjectId },
    pricing: { type: String },
})

export default mongoose.model("Project", ProjectSchema)


