import { FileRepository } from "../interfaces/FileRepository";
import {File} from "../file"

export class ListFilesService {
    private repository: FileRepository;

    constructor(repository: FileRepository) {
        this.repository = repository;
    }

    public async execute(): Promise<File[]> {
        return await this.repository.findAll();
    }
}