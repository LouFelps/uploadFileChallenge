import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateFileService } from "../../../../domain/modules/file/services/UpdateFileService";
import { FastifyController } from "../../../shared/controller/FastifyController";
import { File } from "../../../../domain/modules/file/file";
import { UpdateParams } from "../../../../domain/shared/utils/service/UpdateService";

export class UpdateFileController implements FastifyController {
    public service: UpdateFileService;

    constructor(service: UpdateFileService) {
        this.service = service;
    }

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const { id } = request.params as { id: string };
        const body = request.body as Partial<ReturnType<File["toObject"]>>;

        const fileToUpdate = new File({
          filename: body.filename || "default-filename",
          ...body,
        });

        const updateParams: UpdateParams<File> = {
          id,
          update: fileToUpdate,
        };
    
        const updatedFile = await this.service.execute(updateParams);
    
        if (!updatedFile) {
          return reply.status(404).send({ error: "Arquivo não encontrado" });
        }
    
        return reply.status(200).send(updatedFile.toObject());
      }
}