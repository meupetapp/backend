import { FastifyRequest, FastifyReply } from 'fastify';
import { getSignedUrlForUpload, getSignedUrlForDownload } from '../services/awsService';

interface GenerateUploadUrlBody {
  filename: string;
  isPublic?: boolean;
}

interface GenerateDownloadUrlQuery {
  filename: string;
}

export const generateUploadUrl = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { filename, isPublic } = req.body as GenerateUploadUrlBody;

    if (!filename) {
      return reply.code(400).send({ message: 'Nome do arquivo é necessário' });
    }

    const signedUrl = await getSignedUrlForUpload(filename, isPublic || false);
    reply.send({ url: signedUrl });
  } catch (error) {
    const err = error as Error;
    reply.code(500).send({ message: 'Erro ao gerar uma URL para upload', error: err.message });
  }
};

export const generateDownloadUrl = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { filename } = req.query as GenerateDownloadUrlQuery;

    if (!filename) {
      return reply.code(400).send({ message: 'Nome do arquivo é necessário' });
    }

    const signedUrl = await getSignedUrlForDownload(filename);
    reply.send({ url: signedUrl });
  } catch (error) {
    const err = error as Error;
    reply.code(500).send({ message: 'Erro ao gerar uma URL para download', error: err.message });
  }
};