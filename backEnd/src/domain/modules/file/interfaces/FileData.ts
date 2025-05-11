import { MultipartFile } from "@fastify/multipart";
import { BaseData } from "../../base/interfaces/BaseData";
import { Readable } from "stream";

export interface FileData extends BaseData {
    filename: string;
    fileStream?: MultipartFile;
    mimeType?: string;
    size?: number;
    path?: string;
    downloadToken?: string;
    expiresAt?: Date;
}