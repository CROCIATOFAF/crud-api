import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/httpHelpers';
import { users } from '../models/userModel';

export const handleGetUserById = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) {
        sendJSONResponse(res, { message: 'User not found' }, 404);
        return;
    }
    sendJSONResponse(res, user, 200);
};
