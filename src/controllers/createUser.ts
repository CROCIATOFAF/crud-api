import { IncomingMessage, ServerResponse } from 'http';
import { parseJSONBody, sendJSONResponse, generateUUID } from '../utils/httpHelpers';
import { User, users } from '../models/userModel';

export const handleCreateUser = async (req: IncomingMessage, res: ServerResponse) => {

    console.log("Received POST request to /api/users");

    try {
        const userData = await parseJSONBody<Omit<User, 'id'>>(req);
        console.log("Parsed userData:", userData);

        const newUser: User = {
            ...userData,
            id: generateUUID(),
        };
        users.push(newUser);
        console.log("Sending newUser response:", newUser);

        sendJSONResponse(res, newUser, 201);
        return;
    } catch (error) {
        console.error('Failed to create user:', error);
        if (!res.headersSent) {
            sendJSONResponse(res, { message: 'Failed to create user' }, 500);
            return;
        }
    }
};
