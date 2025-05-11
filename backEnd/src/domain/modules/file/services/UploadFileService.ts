import { UploadService } from "../../../shared/utils/service/UploadService";
import { FileRepository } from "../interfaces/FileRepository";
import {File} from "../file"
import { MultipartFile } from "@fastify/multipart";

export class UploadFileService implements UploadService<File | MultipartFile> {
    private repository: FileRepository;

    constructor(repository: FileRepository) {
        this.repository = repository;
    }

    public async execute(params: MultipartFile): Promise<File> {
        const uploadedFiles = await this.repository.uploadFiles(params);
        return uploadedFiles;
    }
}