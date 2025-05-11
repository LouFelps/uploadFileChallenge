import { FastifyController } from "../../../shared/controller/FastifyController";
import {File} from "../../../../domain/modules/file/file"
import { UploadFileService } from "../../../../domain/modules/file/services/UploadFileService";
import { FastifyRequest, FastifyReply } from "fastify";

export class UploadFileController implements FastifyController {
    private service: UploadFileService;

    constructor(service: UploadFileService) {
        this.service = service;
    }

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const data = await request.file();

        if(!data) {
            return reply.status(400).send({error: 'Nenhum arquivo enviado'});
        }
        
        const savedFile = await this.service.execute(data);
        
        return reply.code(201).send(savedFile)
    }
}