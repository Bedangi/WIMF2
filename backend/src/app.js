import express from "express";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import searchRoutes from "../routes/search.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signUp.html"));
});

export default app;
