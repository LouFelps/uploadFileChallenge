import { ListFileController } from "./ListFileController";
import { listFilesService } from "../../../../domain/modules/file";

export const listFilesController = new ListFileController(listFilesService);