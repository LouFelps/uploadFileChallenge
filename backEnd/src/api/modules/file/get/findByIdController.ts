import { FastifyRequest, FastifyReply } from "fastify";
import { FindByIdService } from "../../../../domain/modules/file/services/FindByIdService";
import { FastifyController } from "../../../shared/controller/FastifyController";

export class FindByIdController implements FastifyController {
    private service: FindByIdService;

    constructor(service: FindByIdService) {
        this.service = service;
    }

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const { id } = request.params as {id: string };

        const file = await this.service.execute({ id });

        if (!file) {
            return reply.status(404).send({error: "Arquivo não encontrado"});
        }
        return reply.status(200).send(file.toObject());

    }
}