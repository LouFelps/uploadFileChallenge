import { MultipartFile } from "@fastify/multipart";
import { Base } from "../base/base";
import { FileData } from "./interfaces/FileData";

export class File extends Base<FileData> {
    private filename!: string;
    private fileStream?: MultipartFile;
    private mimeType?: string;
    private size?: number;
    private path?: string;
    private downloadToken?: string;
    private expiresAt?: Date;

    constructor(file: FileData) {
        const {filename, fileStream, mimeType, size, path, downloadToken, expiresAt} = file;
        super({...file});

        this.setFileName(filename);
        this.setFileStream(fileStream);
        this.setMimeType(mimeType);
        this.setSize(size);
        this.setPath(path);
        this.setDownloadToken(downloadToken);
        this.setExpiresAt(expiresAt);
    }

    public getFileName(): string {
        return this.filename;
    }
    public setFileName(filename: string) {
        this.filename = filename;
    }
    public getFileStream(): MultipartFile | undefined {
        return this.fileStream;
    }
    public setFileStream(fileStream?: MultipartFile) {
        this.fileStream = fileStream;
    }
    public getMimeType(): string | undefined {
        return this.mimeType;
    }
    public setMimeType(mimeType?: string) {
        this.mimeType = mimeType;
    }
    public getSize(): number | undefined {
        return this.size;
    }
    public setSize(size?: number) {
        this.size = size;
    }
    public getPath(): string | undefined {
        return this.path;
    }
    public setPath(path?: string) {
        this.path = path;
    }
    public getDownloadToken(): string | undefined {
        return this.downloadToken;
    }
    public setDownloadToken(downloadToken?: string) {
        this.downloadToken = downloadToken;
    }
    public getExpiresAt(): Date | undefined {
        return this.expiresAt;
    }
    public setExpiresAt(expiresAt?: Date) {
        this.expiresAt = expiresAt;
    }
    public override toObject(): FileData {
        const file: FileData = {
            id: this.getId(),
            createdAt: this.getCreatedAt(),
            updatedAt: this.getUpdatedAt(),
            filename: this.getFileName(),
            fileStream: this.getFileStream(),
            mimeType: this.getMimeType(),
            size: this.getSize(),
            path: this.getPath(),
            downloadToken: this.getDownloadToken(),
            expiresAt: this.getExpiresAt(),
        };
        return file;
    }

    public override toEntity(): File {
        const file: FileData = {
            filename: this.getFileName(),
            fileStream: this.getFileStream(),
            mimeType: this.getMimeType(),
            size: this.getSize(),
            path: this.getPath(),
            downloadToken: this.getDownloadToken(),
            expiresAt: this.getExpiresAt(),
        };

        return new File(file);
    }
};