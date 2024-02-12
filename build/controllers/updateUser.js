var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseJSONBody, sendJSONResponse } from '../utils/httpHelpers';
import { users } from '../models/userModel';
export const handleUpdateUser = (req, res, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
        sendJSONResponse(res, { message: 'User not found' }, 404);
        return;
    }
    try {
        const userData = yield parseJSONBody(req);
        const updatedUser = Object.assign(Object.assign({}, users[index]), userData);
        users[index] = updatedUser;
        sendJSONResponse(res, updatedUser, 200);
    }
    catch (error) {
        sendJSONResponse(res, { message: 'Failed to update user' }, 400);
    }
});
