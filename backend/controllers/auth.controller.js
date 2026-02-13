import { saveUser, validateUser } from "../services/auth.service.js";

export const signup = (req, res) => {
    const { email, password } = req.body;

    saveUser({ email, password });

    return res.redirect("/search.html");
};

export const signin = (req, res) => {
    const { email, password } = req.body;

    const isValid = validateUser(email, password);

    if (isValid) {
        return res.redirect("/search.html");
    }

    return res.redirect("/signIn.html");
};
