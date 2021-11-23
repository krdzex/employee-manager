import mongoose from "mongoose"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
    userName: { type: String, trim: true,unique: "Username already exists" },
    img: { type: String, trim: true },
    role: { type: String },
    contractedSalary: { type: Number },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phoneNumber: { type: String },
    birthDate: { type: Date },
    employmentStartDate: { type: Date },
    status: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    employmentEndDate: { type: Date },
    email: {
        type: String, trim: true,
        unique: "Email already exists",
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        trim: true
    },
    salt: String,
})

UserSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();

    this.hashed_password = this.encryptPassword(password)
})

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ""
        try {
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
        } catch (error) {
            return ""
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ""
    }
}

export default mongoose.model("User", UserSchema)


