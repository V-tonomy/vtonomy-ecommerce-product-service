import { DeleteImageByIdHandler } from './handler';
import { CreateImageHandler } from './handler/create-image.cmd.handler';

export const IMAGE_HANDLER = [DeleteImageByIdHandler, CreateImageHandler];
