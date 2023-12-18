import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AppConfig = {
    // ...
    api: {
        // ...
        url: 'http://localhost:3000/api',
    },
    port: 3001,
    SESSION_SECRET: "blackcatsecret",
    MONGODB_URL:"mongodb://localhost:27017/rotation-luck",
    rootPath: path.resolve(__dirname, '../../'),
    jwtSecret: "chaomungden",
    access_token_secret: "chaomungden",
    access_token_life: 3600,
};

export default AppConfig;
