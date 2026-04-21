import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, "../data/users.json");

const readUsers = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }

    const data = fs.readFileSync(dataFilePath, "utf-8");

    if (data.trim() === "") {
        return [];
    }

    return JSON.parse(data);
};

export const saveUser = ({ email, password }) => {
    const users = readUsers();

    users.push({
        email,
        password,
        createdAt: new Date().toISOString()
    });

    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 4));
};

export const validateUser = (email, password) => {
    const users = readUsers();

    return users.some(
        (user) => user.email === email && user.password === password
    );
};

export const emailExists = (email) => {
    const users = readUsers();
    return users.some((user) => user.email === email);
};
