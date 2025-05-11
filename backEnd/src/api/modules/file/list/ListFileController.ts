import { FastifyRequest, FastifyReply } from "fastify";
import { ListFilesService } from "../../../../domain/modules/file/services/ListFilesService";
import { FastifyController } from "../../../shared/controller/FastifyController"

export class ListFileController implements FastifyController {
    private service: ListFilesService;

    constructor(service: ListFilesService) {
        this.service = service;
    }

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const files = await this.service.execute();
        return reply.code(200).send(files.map(file => file.toObject()));
    }
}