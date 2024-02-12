import http from 'http';
import { router } from './routes/router';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    router(req, res);
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
