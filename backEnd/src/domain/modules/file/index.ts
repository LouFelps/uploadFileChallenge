import { MongooseFileRepository } from "./implementations/mongoose/FileRepository";
import { DownloadFileByTokenService } from "./services/DownloadFileByTokenService";
import { ListFilesService } from "./services/ListFilesService";
import { UploadFileService } from "./services/UploadFileService";
import { FindByIdService } from "./services/FindByIdService";
import { UpdateFileService } from "./services/UpdateFileService";
import { DeleteFileService } from "./services/DeleteFileService";


export const fileRepository = new MongooseFileRepository();

export const uploadFileService = new UploadFileService(fileRepository);

export const downloadFileByTokenService = new DownloadFileByTokenService(fileRepository);

export const listFilesService = new ListFilesService(fileRepository);

export const findByIdService = new FindByIdService(fileRepository); 

export const updateFileService = new UpdateFileService(fileRepository);

export const deleteFileService = new DeleteFileService(fileRepository);