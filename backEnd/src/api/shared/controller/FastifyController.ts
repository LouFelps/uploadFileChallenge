import { FastifyReply, FastifyRequest } from 'fastify';

export interface FastifyController {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
}
