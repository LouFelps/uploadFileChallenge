import { MultipartFile } from "@fastify/multipart";
import { Crud } from "../../../shared/cruds/Crud";
import { File } from "../file";

export interface FileRepository extends Crud<File> {
    uploadFiles(params: File | MultipartFile): Promise<File>;
    downloadFileByToken(token: string): Promise<File | null>;
    findById(id: string): Promise<File | null>; 
}