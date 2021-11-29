import { teamInfo } from "../ApiService/teamApi";

const authenticate = (jwt, cb) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("jwt", JSON.stringify(jwt));
        cb()
    }
}

const isAuthentcated = () => {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt")) {
        return JSON.parse(sessionStorage.getItem("jwt"))
    }
    return false;
}



const isAuthorized = async (id) => {

    let teamInformation = await teamInfo(id);

    for (let i = 0; i < teamInformation.emyploees.length; i++) {
        if (teamInformation.emyploees[i]._id === isAuthentcated().user._id) {
            return true
        }
    }
    return false;
}


const isAuthorizedProjects = async (id) => {

    let teamInformation = await teamInfo(id);

    for (let i = 0; i < teamInformation.emyploees.length; i++) {
        if (teamInformation.emyploees[i]._id === isAuthentcated().user._id) {
            return true
        }
    }
    return false;
}



const signOut = () => {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt")
}

export default { authenticate, isAuthentcated, signOut, isAuthorized }