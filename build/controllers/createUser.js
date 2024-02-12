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
    try {
        const newUser = yield parseJSONBody(req);
        newUser.id = generateUUID();
        users.push(newUser);
        sendJSONResponse(res, newUser, 201);
    }
    catch (error) {
        sendJSONResponse(res, { message: 'Invalid user data provided' }, 400);
    }
});
