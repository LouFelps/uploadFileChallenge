import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { uploadFileController } from "../../modules/file/upload";
import { downloadFileByTokenController } from "../../modules/file/download"
import { listFilesController } from "../../modules/file/list";
import { findByIdController } from "../../modules/file/get";
import { updateFileController } from "../../modules/file/update";
import { deleteFileController } from "../../modules/file/delete";

export const fileRoutes = (server: FastifyInstance, opts: FastifyPluginOptions, done: ()=> void,) => {
    server.post('/upload', async (request, reply) => {
        await uploadFileController.handle(request, reply);
    });

    server.get('/download/:token', async (request: FastifyRequest, reply) => {
        await downloadFileByTokenController.handle(request, reply);
    });

    server.get('/find/', async (request: FastifyRequest, reply) =>{
        await listFilesController.handle(request, reply);
    });

    server.get('/find/:id', async (request: FastifyRequest, reply) => {
        await findByIdController.handle(request, reply);
    });

    server.put('/update/:id', async (request: FastifyRequest, reply)=> {
        await updateFileController.handle(request, reply);
    });

    server.delete('/delete/:id', async (request: FastifyRequest, reply)=> {
        await deleteFileController.handle(request, reply);
    });
    done();
};