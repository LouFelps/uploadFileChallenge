import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteFileService } from "../../../../domain/modules/file/services/DeleteFileService";
import { FastifyController } from "../../../shared/controller/FastifyController";

export class DeleteFileController implements FastifyController {
    public service: DeleteFileService;

  constructor(service: DeleteFileService) {
    this.service = service
  }

  public async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { id } = request.params as { id: string };

    const deleted = await this.service.execute({ id });

    if (!deleted) {
      return reply.status(404).send({ error: "Arquivo não encontrado" });
    }

    return reply.status(200).send({ message: "Arquivo removido com sucesso" });
  }
}
