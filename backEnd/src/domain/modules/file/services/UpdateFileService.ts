import { UpdateParams, UpdateService } from "../../../shared/utils/service/UpdateService";
import { File } from "../file";
import { FileRepository } from "../interfaces/FileRepository";

export class UpdateFileService implements UpdateService<File> {
    private repository: FileRepository;

    constructor(repository: FileRepository) {
        this.repository = repository;
    }

    public async execute(params: UpdateParams<File>): Promise<File | null> {
        const { id, update } = params;
        const file = await this.repository.findAndUpdate(id, update);
        return file;
    }

}