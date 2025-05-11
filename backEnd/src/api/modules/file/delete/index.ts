import { deleteFileService } from "../../../../domain/modules/file";
import { DeleteFileController } from "./DeleteFileController";

export const deleteFileController = new DeleteFileController(deleteFileService);