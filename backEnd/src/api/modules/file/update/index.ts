import { updateFileService } from "../../../../domain/modules/file";
import { UpdateFileController } from "./UpdateFileController";


export const updateFileController = new UpdateFileController(updateFileService);