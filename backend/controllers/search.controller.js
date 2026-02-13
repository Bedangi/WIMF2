import { saveState } from "../services/search.service.js";

export const saveSearchState = (req, res) => {
    saveState(req.body);
    res.json({ success: true });
};
