import request from 'supertest';
import serverBuild from '../server'; // Ajuste o caminho se necessário
import path from 'path';
import fs from 'fs';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import { testDatabase } from '../config/environment';

let app: Awaited<ReturnType<typeof serverBuild>>;
const mongo = mongoose;

let uploadedFileToken: string | null = null;
let originalFileName: string | null = null;
let originalFileType: string | null = null;
let originalFileBuffer: Buffer | null = null;

const testFilePath = path.resolve(__dirname, 'fixtures', 'test.jpeg');

beforeAll(async () => {
  try {
    await mongo.connect(testDatabase.uri!);
  } catch (error) {
    console.error("Falha ao conectar ao MongoDB para testes:", error);
    process.exit(1);
  }
  originalFileBuffer = fs.readFileSync(testFilePath);

  app = await serverBuild();
  await app.ready();
});

afterAll(async () => {
  if (app) {
    await app.close();
  }
  await mongo.connection.db!.dropDatabase();
  await mongo.disconnect();
});

describe('Sistema de Upload e Download de Arquivos', () => {
  describe('Upload de Arquivos', () => {
    it('deve fazer upload de um arquivo com sucesso e retornar um token', async () => {
      if (!fs.existsSync(testFilePath)) {
        console.warn(`Pulando teste de upload: arquivo ${testFilePath} não encontrado.`);
        return;
      }

      const response = await request(app.server)
        .post('/api/upload')
        .attach('file', testFilePath);

      expect(response.status).toBe(201);
      expect(response.body).toBeTypeOf('object');
      expect(response.body).toHaveProperty('downloadToken');
      expect(response.body).toHaveProperty('filename');
      expect(response.body).toHaveProperty('mimeType');

      uploadedFileToken = response.body.downloadToken;
      originalFileName = response.body.filename
      originalFileType = response.body.mimeType

    });

    it('deve retornar erro se nenhum arquivo for enviado', async () => {
        const response = await request(app.server)
          .post('/api/upload');

        expect(response.status).toBe(406);
    });
  });

  describe('Download de Arquivos', () => {
    it('deve fazer download de um arquivo com sucesso usando o token do upload', async () => {

      const response = await request(app.server)
        .get(`/api/download/${uploadedFileToken}`);

      expect(response.status).toBe(200);
      expect(response.headers['content-disposition']).toBe(`attachment; filename="${originalFileName}"`);
      expect(response.headers['content-type']).toEqual(originalFileType);

      expect(response.body).toBeInstanceOf(Buffer);
      expect(response.body.equals(originalFileBuffer)).toBe(true);
    });
    });
});