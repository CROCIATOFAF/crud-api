import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/httpHelpers';
import { users } from '../models/userModel';

export const handleGetUsers = (req: IncomingMessage, res: ServerResponse) => {
    sendJSONResponse(res, users, 200);
};
