/**
 * Parses the JSON body of an incoming HTTP request.
 *
 * @param {IncomingMessage} req
 * @returns {Promise<any>}
 */
export const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(error);
            }
        });
    });
};
