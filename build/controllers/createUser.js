var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseJSONBody, sendJSONResponse, generateUUID } from '../utils/httpHelpers';
import { users } from '../models/userModel';
export const handleCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received POST request to /api/users");
    try {
        const userData = yield parseJSONBody(req);
        console.log("Parsed userData:", userData);
        const newUser = Object.assign(Object.assign({}, userData), { id: generateUUID() });
        users.push(newUser);
        console.log("Sending newUser response:", newUser);
        sendJSONResponse(res, newUser, 201);
        return;
    }
    catch (error) {
        console.error('Failed to create user:', error);
        if (!res.headersSent) {
            sendJSONResponse(res, { message: 'Failed to create user' }, 500);
            return;
        }
    }
});
