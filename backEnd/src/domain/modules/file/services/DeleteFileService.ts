import fs from 'fs/promises';
import { FileRepository } from "../interfaces/FileRepository";
import { File } from "../file";
import { DeleteService } from '../../../shared/utils/service/DeleteService';

export class DeleteFileService implements DeleteService<File>{
  private repository: FileRepository;

  constructor(repository: FileRepository) {
    this.repository = repository;
  }

  public async execute(params: { id: string }): Promise<File | null> {
    const { id } = params;

    const file = await this.repository.findById(id);
    if (!file) return null;

    const path = file.getPath();

    if (path) {
      try {
        await fs.unlink(path);
      } catch (err) {
        console.warn(`⚠️ Falha ao remover o arquivo físico: ${path}`, err);
      }
    }

    await this.repository.delete(id);
    return file;
  }
}
