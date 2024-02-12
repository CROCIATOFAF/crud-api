import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/httpHelpers';
import { handleGetUsers } from '../controllers/getUsers';
import { handleGetUserById } from '../controllers/getUserById';
import { handleCreateUser } from '../controllers/createUser';
import { handleUpdateUser } from '../controllers/updateUser';
import { handleDeleteUser } from '../controllers/deleteUser';

export const router = (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const path = url.pathname;
    const method = req.method;

    const userRegex = /^\/api\/users\/([a-zA-Z0-9\-]+)$/;

    if (path === '/api/users' && method === 'GET') {
        handleGetUsers(req, res);
        return;
    }

    const userMatch = path.match(userRegex);
    if (userMatch && method === 'GET') {
        const userId = userMatch[1];
        handleGetUserById(req, res, userId);
        return;
    }

    if (path === '/api/users' && method === 'POST') {
        handleCreateUser(req, res);
        return;
    }

    if (userMatch && method === 'PUT') {
        const userId = userMatch[1];
        handleUpdateUser(req, res, userId);
        return;
    }

    if (userMatch && method === 'DELETE') {
        const userId = userMatch[1];
        handleDeleteUser(req, res, userId);
        return;
    }

    sendJSONResponse(res, { message: 'Not Found' }, 404);
};
