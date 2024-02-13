import { IncomingMessage, ServerResponse } from 'http';
import { parseJSONBody, sendJSONResponse } from '../utils/httpHelpers';
import { User, users } from '../models/userModel';

export const handleUpdateUser = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
        sendJSONResponse(res, { message: 'User not found' }, 404);
        return;
    }
    try {
        const userData = await parseJSONBody<User>(req);
        const updatedUser = { ...users[index], ...userData };
        users[index] = updatedUser;
        sendJSONResponse(res, updatedUser, 200);
    } catch (error) {
        sendJSONResponse(res, { message: 'Failed to update user' }, 400);
    }
};
