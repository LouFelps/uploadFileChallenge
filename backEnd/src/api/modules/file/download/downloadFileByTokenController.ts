import { FastifyRequest, FastifyReply } from "fastify";
import { DownloadFileByTokenService } from "../../../../domain/modules/file/services/DownloadFileByTokenService";
import { FastifyController } from "../../../shared/controller/FastifyController";

export class DownloadFileByTokenController implements FastifyController {
    private service: DownloadFileByTokenService;

    constructor(service: DownloadFileByTokenService) {
        this.service = service;
    }

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const {token} = request.params as {token: string};
        const file = await this.service.execute(token);

        if (!file) {
            return reply.status(404).send({ error: "Arquivo não encontrado" });
        }

        reply.header('Content-Disposition', `attachment; filename="${file}"`);

        return reply.sendFile(file);
    }
}
