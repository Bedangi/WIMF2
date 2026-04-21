import { saveUser, validateUser, emailExists } from "../services/auth.service.js";

export const signup = (req, res) => {
    const { email, password } = req.body;

    // If the exact credentials already exist, ask the user to sign in instead
    if (validateUser(email, password)) {
        return res.redirect('/signUp.html?error=exists');
    }

    saveUser({ email, password });

    return res.redirect("/home.html");
};

export const signin = (req, res) => {
    const { email, password } = req.body;

    const isValid = validateUser(email, password);

    if (isValid) {
        return res.redirect("/home.html");
    }

    // If email not found, prompt user to sign up first
    if (!emailExists(email)) {
        return res.redirect("/signIn.html?error=notfound");
    }

    // Redirect back to sign-in page with an error flag so the UI can show a message
    return res.redirect("/signIn.html?error=invalid");
};