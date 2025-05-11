import { uploadFileService } from "../../../../domain/modules/file";
import { UploadFileController } from "./uploadFileController";

export const uploadFileController = new UploadFileController(uploadFileService);