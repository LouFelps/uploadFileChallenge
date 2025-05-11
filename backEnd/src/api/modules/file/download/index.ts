import { DownloadFileByTokenController } from "../download/downloadFileByTokenController";
import { downloadFileByTokenService } from "../../../../domain/modules/file";

export const downloadFileByTokenController = new DownloadFileByTokenController(downloadFileByTokenService);
