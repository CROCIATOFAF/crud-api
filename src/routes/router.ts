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
    console.log(`Router: Handling ${method} request for ${path}`);

    const userRegex = /^\/api\/users\/([a-zA-Z0-9-]+)$/;

    if (path === '/api/users' && method === 'GET') {
        console.log('Routing to handleGetUsers');
        handleGetUsers(req, res);
        return;
    }

    const userMatch = path.match(userRegex);
    if (userMatch && method === 'GET') {
        console.log(`Routing to handleGetUserById for userId: ${userMatch[1]}`);
        const userId = userMatch[1];
        handleGetUserById(req, res, userId);
        return;
    }

    if (path === '/api/users' && method === 'POST') {
        console.log('Routing to handleCreateUser');
        handleCreateUser(req, res);
        return;
    }

    if (userMatch && method === 'PUT') {
        console.log(`Routing to handleUpdateUser for userId: ${userMatch[1]}`);
        const userId = userMatch[1];
        handleUpdateUser(req, res, userId);
        return;
    }

    if (userMatch && method === 'DELETE') {
        console.log(`Routing to handleDeleteUser for userId: ${userMatch[1]}`);
        const userId = userMatch[1];
        handleDeleteUser(req, res, userId);
        return;
    }

    console.log(`No route matched. Sending 404 for ${method} ${path}`);
    sendJSONResponse(res, { message: 'Not Found' }, 404);
};
