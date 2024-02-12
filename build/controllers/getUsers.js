import { sendJSONResponse } from '../utils/httpHelpers';
import { users } from '../models/userModel';
export const handleGetUsers = (req, res) => {
    sendJSONResponse(res, users, 200);
};
