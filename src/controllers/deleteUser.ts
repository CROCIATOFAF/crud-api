import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/httpHelpers';
import { users } from '../models/userModel';

export const handleDeleteUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
        sendJSONResponse(res, { message: 'User not found' }, 404);
        return;
    }
    users.splice(index, 1);
    res.writeHead(204);
    res.end();
};
