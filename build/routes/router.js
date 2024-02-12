import { sendJSONResponse } from '../utils/httpHelpers';
import { handleGetUsers } from '../controllers/getUsers';
import { handleGetUserById } from '../controllers/getUserById';
import { handleCreateUser } from '../controllers/createUser';
import { handleUpdateUser } from '../controllers/updateUser';
import { handleDeleteUser } from '../controllers/deleteUser';
export const router = (req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const path = url.pathname;
    const method = req.method;
    // Regex to match /api/users/{userId} pattern
    const userRegex = /^\/api\/users\/([a-zA-Z0-9\-]+)$/;
    // Route: GET /api/users (Fetch all users)
    if (path === '/api/users' && method === 'GET') {
        handleGetUsers(req, res);
        return;
    }
    // Route: GET /api/users/{userId} (Fetch single user by ID)
    const userMatch = path.match(userRegex);
    if (userMatch && method === 'GET') {
        const userId = userMatch[1];
        handleGetUserById(req, res, userId);
        return;
    }
    // Route: POST /api/users (Create new user)
    if (path === '/api/users' && method === 'POST') {
        handleCreateUser(req, res);
        return;
    }
    // Route: PUT /api/users/{userId} (Update user)
    if (userMatch && method === 'PUT') {
        const userId = userMatch[1];
        handleUpdateUser(req, res, userId);
        return;
    }
    // Route: DELETE /api/users/{userId} (Delete user)
    if (userMatch && method === 'DELETE') {
        const userId = userMatch[1];
        handleDeleteUser(req, res, userId);
        return;
    }
    // Handling non-existing endpoints
    sendJSONResponse(res, { message: 'Not Found' }, 404);
};
