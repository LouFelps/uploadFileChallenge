import request from 'supertest';
import serverBuild from '../server';
import path from 'path';
import fs from 'fs';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import { testDatabase } from '../config/environment';

let app: Awaited<ReturnType<typeof serverBuild>>;
const mongo = mongoose;

const testFilePath = path.resolve(__dirname, 'fixtures', 'test.jpeg');

beforeAll(async () => {
  try {
    await mongo.connect(testDatabase.uri!);
  } catch (error) {
    console.error("Falha ao conectar ao MongoDB para testes:", error);
    process.exit(1);
  }

  app = await serverBuild();
  await app.ready();
});

afterAll(async () => {
  if (app) {
    await app.close();
  }
  await mongo.disconnect();
});

describe('Sistema de Upload', () => {
  describe('Upload de Arquivos', () => {
    it('deve fazer upload de um arquivo com sucesso', async () => {
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
    });

    it('deve retornar erro se nenhum arquivo for enviado', async () => {
        const response = await request(app.server)
          .post('/api/upload');

        expect(response.status).toBe(406);
    });
  });
});
