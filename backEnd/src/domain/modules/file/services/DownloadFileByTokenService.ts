import { FileRepository } from "../interfaces/FileRepository";
import {File} from "../file"
import { DownloadService } from "../../../shared/utils/service/DownloadService";
import path from "path";

export class DownloadFileByTokenService implements DownloadService<File | string> {
    private repository: FileRepository;

    constructor(repository: FileRepository) {
        this.repository = repository;
    }

    public async execute(downloadToken: string): Promise<string> {
        const file = await this.repository.downloadFileByToken(downloadToken);
        const getPath = file!.getPath()
        const filename = path.basename(getPath!);

        return filename!;
    }
}