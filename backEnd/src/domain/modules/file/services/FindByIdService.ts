import { GetByIdService } from "../../../shared/utils/service/GetByIdService";
import { FileRepository } from "../interfaces/FileRepository";
import { File } from "../file";

export class FindByIdService implements GetByIdService<File> {
    private repository: FileRepository;

    constructor(repository: FileRepository) {
        this.repository = repository;
    }

    public async execute(params: { id: string; }): Promise<File | null> {
        const { id } = params;

        const file = await this.repository.findById(id);
        return file;
    }
}