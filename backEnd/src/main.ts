import { api } from './config/environment';
import { initialize } from './domain/database/mongoose';
import serverBuild from './server';

(async function init() {
    try {
        await initialize();
        const server = await serverBuild();
        const hostAndPort = await server.listen({ port: api.port, host: api.host });
        console.log(`server listening on ${hostAndPort}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}());
