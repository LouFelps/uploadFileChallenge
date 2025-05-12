import fastify, {FastifyInstance} from 'fastify';
import env from './config/environment'
import fastifyMultipart from '@fastify/multipart';
import { routes } from './api/routes';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fastifyCors from '@fastify/cors';
  

async function serverBuild(): Promise<FastifyInstance> {
    const server = fastify({
      logger: env?.env === 'development',
    });
    server.register(fastifyMultipart, {
      limits: {fileSize: 100*1024**4}
    });
    server.register(routes, { prefix: '/api' });
    server.register(fastifyStatic, {
      root: path.join(process.cwd(), 'uploads'),
    });
    server.register(fastifyCors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
    return server
}

export default serverBuild;