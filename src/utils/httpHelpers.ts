import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';

export const sendJSONResponse = (res: ServerResponse, data: object, statusCode: number) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

export const parseJSONBody = <T>(req: IncomingMessage): Promise<T> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
    });
};

export const generateUUID = () => uuidv4();
