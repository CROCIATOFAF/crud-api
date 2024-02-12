import { IncomingMessage, ServerResponse } from 'http';
import { parseJSONBody, sendJSONResponse, generateUUID } from '../utils/httpHelpers';
import { User, users } from '../models/userModel';

export const handleCreateUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const newUser: User = await parseJSONBody(req);
        newUser.id = generateUUID();
        users.push(newUser);
        sendJSONResponse(res, newUser, 201);
    } catch (error) {
        sendJSONResponse(res, { message: 'Invalid user data provided' }, 400);
    }
};
