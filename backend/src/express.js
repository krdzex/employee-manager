import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors"
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import customerRoutes from "./routes/customer.routes"
import teamRoutes from "./routes/team.routes"
import projectRoutes from "./routes/project.routes"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet())
app.use(cors())
app.use("/", userRoutes)
app.use("/", authRoutes)
app.use("/", customerRoutes)
app.use("/", teamRoutes)
app.use("/", projectRoutes)

export default app;