import type { BaseData } from "../../base/interface/baseData";

export interface FileData extends BaseData {
    filename: string;
    fileStream?: string;
    mimeType?: string;
    size?: number;
    path?: string;
    downloadToken?: string;
    expiresAt?: Date;
}