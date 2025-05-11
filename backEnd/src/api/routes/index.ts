import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { fileRoutes } from "./file/fileRoutes";

export const routes = (server: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    server.register(fileRoutes, {prefix: '/'});
    
    done();
}