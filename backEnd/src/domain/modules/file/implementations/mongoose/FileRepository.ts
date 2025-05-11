import { FileRepository } from "../../interfaces/FileRepository";
import { File } from "../../file";
import { FileModel } from "../../../../../api/routes/file/fileSchemas";
import { FileData } from "../../interfaces/FileData";
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { randomUUID } from 'crypto';
import { MultipartFile } from "@fastify/multipart";

export class MongooseFileRepository implements FileRepository {

  async uploadFiles(file: MultipartFile): Promise<File> {
    const uploadDir = path.join(process.cwd(), 'uploads');
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  
    const filePath = path.join(uploadDir, file.filename);
  
    file.file.on('error', (err) => {
      console.error('❌ Erro no stream do arquivo:', err.message);
    });
  
    try {
      await pipeline(file.file, fs.createWriteStream(filePath));
    } catch (err: any) {
      console.error(err.stack);
      throw new Error('Erro ao salvar arquivo');
    }
  
    const stats = await fs.promises.stat(filePath);
  
    const fileData: FileData = {
      filename: file.filename,
      mimeType: file.mimetype,
      size: stats.size,
      path: filePath,
      downloadToken: randomUUID(),
    };
  
    const fileEntity = new File(fileData);
    await this.create(fileEntity);
  
    return fileEntity;
  }

  async downloadFileByToken(token: string): Promise<File | null> {
      const file = await FileModel.findOne({downloadToken: token});

      if (file) {
      const fileData: FileData = {
        filename: file.filename,
        mimeType: file.mimeType ?? undefined,
        size: file.size ?? undefined,
        path: file.path ?? undefined,
        downloadToken: file.downloadToken ?? undefined,
        expiresAt: file.expiresAt ?? undefined,
      };
      return new File(fileData);
      }
      return null;
  }

  async create(file: File): Promise<File> {
    const doc = new FileModel(file.toObject());
    const saved = await doc.save();
    return this.toEntity(saved);
  }

  async findAndUpdate(id: string, file: File): Promise<File | null> {
    const getFilePath = await this.getFilePath(file, id);
    file.setPath(getFilePath?.newFilePath);
    const updatedDoc = await FileModel.findByIdAndUpdate(id, file.toObject(), { new: true });
    await this.renameFile(getFilePath!.oldFilePath, getFilePath!.newFilePath);

    return updatedDoc ? this.toEntity(updatedDoc) : null;
  }
  

  async delete(id: string): Promise<File | null> {
    const deleted = await FileModel.findByIdAndDelete(id);
    return deleted ? this.toEntity(deleted) : null;
  }

  async findAll(): Promise<File[]> {
    const docs = await FileModel.find();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<File | null> {
      const file = await FileModel.findById(id);
      return file ? this.toEntity(file) : null;
      }

  private toEntity(doc: any): File {
    const fileData: FileData = {
      filename: doc.filename,
      mimeType: doc.mimeType,
      size: doc.size,
      path: doc.path,
      downloadToken: doc.downloadToken,
      expiresAt: doc.expiresAt,
    };
    const entity = new File(fileData);
    entity.setId(doc._id.toString());
    entity.setCreatedAt(doc.createdAt);
    entity.setUpdatedAt(doc.updatedAt);
    return entity;
  }
  async getFilePath(file: File, id: string): Promise<{oldFilePath: string, newFilePath: string} | null> {
    const uploadDir = path.join(process.cwd(), 'uploads');
    
    const oldFileDoc = await FileModel.findById(id);
    if (!oldFileDoc) return null;
  
    const oldFilename = oldFileDoc.filename;
    const oldFilePath = path.join(uploadDir, oldFilename);
    const originalExt = path.extname(oldFilename);
  
    const filenameFromClient = file.getFileName();
    const hasExtension = path.extname(filenameFromClient) !== '';
    const finalFilename = hasExtension ? filenameFromClient : filenameFromClient + originalExt;
  
    file.setFileName(finalFilename);
  
    const newFilePath = path.join(uploadDir, finalFilename);
    return { oldFilePath, newFilePath }
  }

  async renameFile(oldFilePath: string, newFilePath: string): Promise<void> {
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error('Erro ao renomear o arquivo físico:', err);
      } else {
        console.log('Arquivo renomeado no disco com sucesso!');
      }
    });
  }
}